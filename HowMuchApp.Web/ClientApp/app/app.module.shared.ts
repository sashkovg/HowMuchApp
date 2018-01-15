import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';

import { PublicModule } from './components/layout/public/public.module'
import { PublicComponent, PUBLIC_ROUTES } from './components/layout/public';

//Servises
import { UserService } from './shared/services/user.service';
import { ConfigService } from './shared/services/config.service';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        PublicModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: [UserService, ConfigService]
})
export class AppModuleShared {
}
