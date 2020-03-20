/**
 * Created by yanxiaojun617@163.com on 12-27.
 */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NativeService } from './NativeService';
import { Observable } from 'rxjs/Rx';
import { DEFAULT_AVATAR} from './Constants';
import { FileService } from './FileService';
import { FileObj } from '../model/FileObj';
import { Utils } from './Utils';
import { Logger } from './Logger';
import { Events } from 'ionic-angular';
import { GlobalData } from './GlobalData';

/**
 * Helper类存放和业务有关的公共方法
 * @description
 */
@Injectable()
export class Helper {

  constructor(
              public logger: Logger,
              private fileService: FileService,
              private nativeService: NativeService,
              private storage: Storage,
              private events: Events,
              private globalData: GlobalData) {
  }

  /**
   * 获取用户头像路径
   * @param avatarId
   */
  loadAvatarPath(avatarId) {
    return Observable.create(observer => {
      if (!avatarId) {
        observer.next(DEFAULT_AVATAR);
      } else {
        this.globalData.showLoading = false;
        this.fileService.getFileInfoById(avatarId).subscribe((res: FileObj) => {
          if (res.origPath) {
            const avatarPath = res.origPath;
            observer.next(avatarPath);
          } else {
            observer.next(DEFAULT_AVATAR);
          }
        }, () => {
          observer.next(DEFAULT_AVATAR);
        });
      }
    });
  }

  /**
   * 登录成功处理
   */
  loginSuccessHandle(userInfo) {
    Utils.sessionStorageClear(); // 清除数据缓存
    this.globalData.user = userInfo;
    this.globalData.userId = userInfo.id;
    this.globalData.username = userInfo.username;
    this.globalData.realname = userInfo.realname;
    this.storage.get('enabled-file-cache-' + userInfo.id).then(res => { // 获取是否启用缓存文件
      if (res === false) {
        this.globalData.enabledFileCache = false;
      }
    });
    this.loadAvatarPath(userInfo.avatarId).subscribe(avatarPath => { // 加载用户头像
      this.globalData.avatarPath = avatarPath;
    });
   
    this.events.publish('user:login', userInfo);
  }


  /**
   * 从文件对象数组中找出指定id对应的文件对象
   * @param fileList 文件对象数组
   * @param idList id数组
   */
  static findFileListById(fileList, ids) {
    if (!ids || ids.length === 0) {
      return [];
    }
    const newFileList = [];
    for (const file of fileList) {
      for (const id of ids) {
        if (file.id == id) {
          newFileList.push(file);
        }
      }
    }
    return newFileList;
  }

  /**
   * 上传文件返回文件id
   */
  uploadPictureByPath(fileList) {
    return Observable.create(observer => {
      if (!fileList || fileList.length === 0) {
        observer.next([]);
        return;
      }
      const fileIds = [];
      const uploadFileList = [];
      for (const fileObj of fileList) {
        if (fileObj.id) {
          fileIds.push(fileObj.id);
        } else {
          fileObj.parameter = fileObj.origPath;
          uploadFileList.push(fileObj);
        }
      }

      this.globalData.showLoading = false;
      this.fileService.uploadMultiByFilePath(uploadFileList).subscribe(fileList => {
        for (const fileObj of fileList) {
          fileIds.push(fileObj.id);
        }
        observer.next(fileIds);
      });

    });
  }

  
}
