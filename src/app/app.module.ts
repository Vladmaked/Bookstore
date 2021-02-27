import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {FooterComponent, HeaderComponent} from './components';
import {MainPageComponent} from './components/pages/main-page/main-page/main-page.component';
import {MainSliderComponent} from './components/pages/main-page/main-slider/main-slider.component';
import {LoginRegistrationPageComponent} from './components/pages/login-registration-page/login-registration-page.component';
import {AccountPageComponent} from './components/pages/account-page/account-page.component';
import {SearchResultComponent} from './components/pages/search-result/search-result.component';
import {ErrorPageComponent} from './components/pages/error-page/error-page.component';
import {MainLayoutComponent} from './shared/main-layout/main-layout.component';
import {CartPageComponent} from './components/pages/cart-page/cart-page.component';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminModule} from './admin/admin.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderPageComponent} from './components/pages/order-page/order-page.component';
import {DeliveryAndPaymentPageComponent} from './components/pages/help-pages/delivery-and-payment-page/delivery-and-payment-page.component';
import {HelpPageComponent} from './components/pages/help-page/help-page.component';
import {ContactsPageComponent} from './components/pages/help-pages/contacts-page/contacts-page.component';
import {HowToPlaceAnOrderPageComponent} from './components/pages/help-pages/how-to-place-an-order-page/how-to-place-an-order-page.component';
import {ReturnReplacementPageComponent} from './components/pages/help-pages/return-replacement-page/return-replacement-page.component';
import {FAQPageComponent} from './components/pages/help-pages/faq-page/faq-page.component';
import {PricesInTheStorePageComponent} from './components/pages/help-pages/prices-in-the-store-page/prices-in-the-store-page.component';
import {TermsAndConditionsPageComponent} from './components/pages/help-pages/terms-and-conditions-page/terms-and-conditions-page.component';
import {ConsumerSupportPageComponent} from './components/pages/help-pages/consumer-support-page/consumer-support-page.component';
import {ClaimsPageComponent} from './components/pages/help-pages/claims-page/claims-page.component';
import {PrivacyPolicyPageComponent} from './components/pages/help-pages/privacy-policy-page/privacy-policy-page.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {fbDbEnvironment} from '../environments/environment';
import {SharedModule} from './shared/shared.module';
import {MyOrdersPageComponent} from './components/pages/account-pages/my-orders-page/my-orders-page.component';
import {MyDataPageComponent} from './components/pages/account-pages/my-data-page/my-data-page.component';
import {MyAddressPageComponent} from './components/pages/account-pages/my-address-page/my-address-page.component';
import {MyReturnsPageComponent} from './components/pages/account-pages/my-returns-page/my-returns-page.component';
import {PaymentAccountDataPageComponent} from './components/pages/account-pages/payment-account-data-page/payment-account-data-page.component';
import {appServices} from './services';
import {appPipes} from './shared/pipes';
import {
  BreadcrumbsModule,
  CatalogModule,
  CategoriesListModule,
  ProductsDetailsModule,
  ProductsListModule,
  SubcategoriesDetailsModule
} from './modules';
import {SubcategoriesListModule} from './modules/subcategories/list';

registerLocaleData(localeUk, 'uk');


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    MainSliderComponent,
    LoginRegistrationPageComponent,
    AccountPageComponent,
    SearchResultComponent,
    ErrorPageComponent,
    MainLayoutComponent,
    CartPageComponent,
    OrderPageComponent,
    DeliveryAndPaymentPageComponent,
    HelpPageComponent,
    ContactsPageComponent,
    HowToPlaceAnOrderPageComponent,
    ReturnReplacementPageComponent,
    FAQPageComponent,
    PricesInTheStorePageComponent,
    TermsAndConditionsPageComponent,
    ConsumerSupportPageComponent,
    ClaimsPageComponent,
    PrivacyPolicyPageComponent,
    MyOrdersPageComponent,
    MyDataPageComponent,
    MyAddressPageComponent,
    MyReturnsPageComponent,
    PaymentAccountDataPageComponent,
    ...appPipes
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    QuillModule.forRoot(),
    AdminModule,
    FormsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: fbDbEnvironment.production}),
    ProductsListModule,
    SubcategoriesListModule,
    CategoriesListModule,
    CatalogModule,
    AppRoutingModule,
    BreadcrumbsModule,
    ProductsDetailsModule,
    SubcategoriesDetailsModule
  ],
  providers: [
    // {
      // provide: HTTP_INTERCEPTORS,
      // multi: true,
      // useClass: AuthInterceptor
    // },
    {
      provide: LOCALE_ID,
      useValue: 'uk'
    },
    ...appServices,
    ...appPipes
  ],
  exports: [
    ...appPipes
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
