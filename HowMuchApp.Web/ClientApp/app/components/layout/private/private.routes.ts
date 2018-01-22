import { HomeComponent } from '../../home/home.component';
import { TransactionComponent } from '../../transaction/transaction.component';
import { NavMenuComponent } from '../../navmenu/navmenu.component';
import { Routes, RouterModule } from '@angular/router';


export const PRIVATE_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'transaction', component: TransactionComponent }

];