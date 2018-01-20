import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app/app.component';


import { PublicModule } from './components/layout/public/public.module'
import { PublicComponent, PUBLIC_ROUTES } from './components/layout/public';

import { PrivateModule } from './components/layout/private/private.module'
import { PrivateComponent, PRIVATE_ROUTES } from './components/layout/private';

//Servises
import { UserService } from './shared/services/user.service';
import { ConfigService } from './shared/services/config.service';

const routes: Routes = [
    { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
    { path: '', component: PrivateComponent, data: { title: 'Private Views' }, children: PRIVATE_ROUTES }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        PublicModule,
        PrivateModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: [UserService, ConfigService]
})
export class AppModuleShared {
}
