import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Rx';
/*
  本地数据库
  $ ionic cordova plugin add cordova-sqlite-storage
  $ npm install --save @ionic-native/sqlite
*/
@Injectable()
export class SqliteProvider {

    constructor(private sqlite: SQLite) { }

    initSQLite() {
    /** 
         *  数据库名 yumaonote.db
         *  表名 note
        */
        return Observable.create(observer => {
            this.sqlite.create({
            name: 'yumaonote.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql('CREATE TABLE IF NOT EXISTS note id INTEGER PRIMARY KEY, title VARCHAR(400),content TEXT, address VARCHAR(200), reminderTime DATETIME, isStick INT, userPk VARCHAR(200), releaseTime DATETIME);', {})
            .then(res => observer.next(db))
            .catch(e => observer.error(e));
       })
        .catch(e => observer.error(e));
        })
    }
}