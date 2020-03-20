import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { SafetyAnalyComponent } from './safety-analy/safety-analy';
import { ChartComponent } from './chart/chart';

@NgModule({
	declarations: [
    SafetyAnalyComponent,
    ChartComponent],
	imports: [
		IonicModule
	],
	exports: [
    SafetyAnalyComponent,
    ChartComponent]
})
export class ComponentsModule { }
