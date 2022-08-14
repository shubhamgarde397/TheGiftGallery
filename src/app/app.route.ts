import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExamComponent } from './pages/Exam/exam/exam.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const routes: Routes =
    [
        {
            path: '',
            component: MainPageComponent
        },
                    {
                        path: 'TAMIL_BOOK',
                        component: MainPageComponent
                    }
              ,{
                path: 'EXAM',
                component: ExamComponent
            },
        { path: '**', redirectTo: '404' },
        { path: '404', component: PageNotFoundComponent },
    ];
