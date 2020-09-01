import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CatalogPageComponent} from './components/pages/catalog-page/catalog-page.component';
import {AccountPageComponent} from './components/pages/account-page/account-page.component';
import {ErrorPageComponent} from './components/pages/error-page/error-page.component';
import {LoginRegistrationPageComponent} from './components/pages/login-registration-page/login-registration-page.component';
import {MainPageComponent} from './components/pages/main-page/main-page/main-page.component';
import {MainLayoutComponent} from './shared/main-layout/main-layout.component';
import {ProductPageComponent} from './components/pages/product-page/product-page.component';
import {CartPageComponent} from './components/pages/cart-page/cart-page.component';
import {OrderPageComponent} from './components/pages/order-page/order-page.component';
import {SearchResultComponent} from './components/pages/search-result/search-result.component';
import {CategoriesPageComponent} from './components/pages/categories-page/categories-page.component';
import {CategoryPageComponent} from './components/pages/category-page/category-page.component';
import {SubcategoriesPageComponent} from './components/pages/subcategories-page/subcategories-page.component';
import {SubcategoryPageComponent} from './components/pages/subcategory-page/subcategory-page.component';
import {DeliveryAndPaymentPageComponent} from './components/pages/help-pages/delivery-and-payment-page/delivery-and-payment-page.component';
import {HelpPageComponent} from './components/pages/help-page/help-page.component';
import {ContactsPageComponent} from './components/pages/help-pages/contacts-page/contacts-page.component';
// tslint:disable-next-line:max-line-length
import {HowToPlaceAnOrderPageComponent} from './components/pages/help-pages/how-to-place-an-order-page/how-to-place-an-order-page.component';
import {ReturnReplacementPageComponent} from './components/pages/help-pages/return-replacement-page/return-replacement-page.component';
import {FAQPageComponent} from './components/pages/help-pages/faq-page/faq-page.component';
import {PricesInTheStorePageComponent} from './components/pages/help-pages/prices-in-the-store-page/prices-in-the-store-page.component';
import {TermsAndConditionsPageComponent} from './components/pages/help-pages/terms-and-conditions-page/terms-and-conditions-page.component';
import {ConsumerSupportPageComponent} from './components/pages/help-pages/consumer-support-page/consumer-support-page.component';
import {ClaimsPageComponent} from './components/pages/help-pages/claims-page/claims-page.component';
import {PrivacyPolicyPageComponent} from './components/pages/help-pages/privacy-policy-page/privacy-policy-page.component';
import {AuthGuard} from './shared/auth.guard';
import {MyOrdersPageComponent} from './components/pages/account-pages/my-orders-page/my-orders-page.component';
import {MyReturnsPageComponent} from './components/pages/account-pages/my-returns-page/my-returns-page.component';
import {MyDataPageComponent} from './components/pages/account-pages/my-data-page/my-data-page.component';
import {MyAddressPageComponent} from './components/pages/account-pages/my-address-page/my-address-page.component';
import {PaymentAccountDataPageComponent} from './components/pages/account-pages/payment-account-data-page/payment-account-data-page.component';

const routes: Routes = [
    {
      path: '', component: MainLayoutComponent, children: [
        {path: '', redirectTo: '/', pathMatch: 'full'},
        {path: '', component: MainPageComponent},
        {path: 'cart', component: CartPageComponent, data: {breadcrumb: 'Кошик'}},
        {path: 'catalog', component: CatalogPageComponent, data: {breadcrumb: 'Каталог'}},
        {
          path: 'catalog',
          data: {
            breadcrumb: 'Каталог'
          },
          children: [
            {
              path: 'categories',
              component: CategoriesPageComponent,
              data: {
                breadcrumb: 'Категорії'
              }
            },
            {
              path: ':category',
              component: CategoryPageComponent,
              data: {
                breadcrumb: ''
              }
            },
            {
              path: ':category',
              data: {
                breadcrumb: ''
              },
              children: [
                {
                  path: 'subcategories',
                  component: SubcategoriesPageComponent,
                  data: {
                    breadcrumb: 'Підкатегорії'
                  }
                },
                {
                  path: ':subcategory',
                  component: SubcategoryPageComponent,
                  data: {
                    breadcrumb: ''
                  }
                }
              ]
            }
          ]
        },
        {path: 'catalog-author', component: CatalogPageComponent, data: {breadcrumb: 'Каталог'}},
        {
          path: 'product', data: {breadcrumb: ''}, children: [
            {
              path: ':id',
              component: ProductPageComponent,
              data: {
                breadcrumb: ''
              }
            }
          ]
        },
        {path: 'order', component: OrderPageComponent, data: {breadcrumb: 'Замовлення'}},
        {
          path: 'help', data: {breadcrumb: 'Допомога'}, component: HelpPageComponent, children: [
            {
              path: 'delivery-and-payment', component: DeliveryAndPaymentPageComponent, data: {
                breadcrumb: 'Доставка' +
                  ' та оплата'
              }
            },
            {
              path: 'contacts', component: ContactsPageComponent, data: {
                breadcrumb: 'Контакти'
              }
            },
            {
              path: 'how-to-place-an-order', component: HowToPlaceAnOrderPageComponent, data: {
                breadcrumb: 'Як оформити замовлення'
              }
            },
            {
              path: 'return-replacement', component: ReturnReplacementPageComponent, data: {
                breadcrumb: 'Повернення / заміна'
              }
            },
            {
              path: 'faq', component: FAQPageComponent, data: {
                breadcrumb: 'Питання-відповіді'
              }
            },
            {
              path: 'prices-in-the-store', component: PricesInTheStorePageComponent, data: {
                breadcrumb: 'Ціни в магазині'
              }
            },
            {
              path: 'terms-and-conditions', component: TermsAndConditionsPageComponent, data: {
                breadcrumb: 'Умови та положення'
              }
            },
            {
              path: 'consumer-support', component: ConsumerSupportPageComponent, data: {
                breadcrumb: 'Підтримка споживача'
              }
            },
            {
              path: 'claims', component: ClaimsPageComponent, data: {
                breadcrumb: 'Претензії'
              }
            },
            {
              path: 'privacy-policy', component: PrivacyPolicyPageComponent, data: {
                breadcrumb: 'Політика конфіденційності'
              }
            }
          ]
        },
        {path: 'search', component: SearchResultComponent},
        {path: 'login-registration-page', component: LoginRegistrationPageComponent, data: {breadcrumb: 'Вхід та реєстрація'}},
        {
          path: 'account',
          component: AccountPageComponent,
          data: {breadcrumb: 'Особистий кабінет'},
          canActivate: [AuthGuard],
          children: [
            {
              path: 'my-orders', component: MyOrdersPageComponent, data: {breadcrumb: 'Мої замовлення'}
            },
            {
              path: 'my-returns', component: MyReturnsPageComponent, data: {breadcrumb: 'Мої повернення'}
            },
            {
              path: 'my-data', component: MyDataPageComponent, data: {breadcrumb: 'Мої дані'}
            },
            {
              path: 'my-address', component: MyAddressPageComponent, data: {breadcrumb: 'Моя адреса'}
            },
            {
              path: 'payment-account-data', component: PaymentAccountDataPageComponent, data: {breadcrumb: 'Дані рахунку'}
            },
          ]
        }
      ]
    },
    {
      path: 'admin', loadChildren:
        () => import('./admin/admin.module').then(m => m.AdminModule)
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
