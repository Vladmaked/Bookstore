import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeUk from '@angular/common/locales/uk';

registerLocaleData(localeUk, 'uk');


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {CatalogPageComponent} from './components/pages/catalog-page/catalog-page.component';
import {MainPageComponent} from './components/pages/main-page/main-page/main-page.component';
import {MainSliderComponent} from './components/pages/main-page/main-slider/main-slider.component';
import {ProductPageComponent} from './components/pages/product-page/product-page.component';
import {LoginRegistrationComponent} from './components/pages/login-registration/login-registration.component';
import {AccountPageComponent} from './components/pages/account-page/account-page.component';
import {SearchResultComponent} from './components/pages/search-result/search-result.component';
import {ErrorPageComponent} from './components/pages/error-page/error-page.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {MainLayoutComponent} from './shared/main-layout/main-layout.component';
import {CartPageComponent} from './components/pages/cart-page/cart-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {AuthInterceptor} from './shared/auth.interceptor';
import {ProductComponent} from './components/product/product.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SortingPipe} from './shared/pipes/sorting.pipe';
import {AdminModule} from './admin/admin.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderPageComponent} from './components/pages/order-page/order-page.component';
import {CategoriesPageComponent} from './components/pages/categories-page/categories-page.component';
import {CategoryPageComponent} from './components/pages/category-page/category-page.component';
import {SubcategoriesPageComponent} from './components/pages/subcategories-page/subcategories-page.component';
import {SubcategoryPageComponent} from './components/pages/subcategory-page/subcategory-page.component';
import {CategoryComponent} from './components/category/category.component';
import {SubcategoryComponent} from './components/subcategory/subcategory.component';
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
import {environment} from '../environments/environment';
import {SharedModule} from './shared/shared.module';
import {AuthService} from './shared/services/auth.service';
import {MyOrdersPageComponent} from './components/pages/account-pages/my-orders-page/my-orders-page.component';
import {MyDataPageComponent} from './components/pages/account-pages/my-data-page/my-data-page.component';
import {MyAddressPageComponent} from './components/pages/account-pages/my-address-page/my-address-page.component';
import {MyReturnsPageComponent} from './components/pages/account-pages/my-returns-page/my-returns-page.component';
import {PaymentAccountDataPageComponent} from './components/pages/account-pages/payment-account-data-page/payment-account-data-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CatalogPageComponent,
    MainPageComponent,
    MainSliderComponent,
    ProductPageComponent,
    LoginRegistrationComponent,
    AccountPageComponent,
    SearchResultComponent,
    ErrorPageComponent,
    BreadcrumbComponent,
    MainLayoutComponent,
    CartPageComponent,
    ProductComponent,
    SortingPipe,
    OrderPageComponent,
    CategoriesPageComponent,
    CategoryPageComponent,
    SubcategoriesPageComponent,
    SubcategoryPageComponent,
    CategoryComponent,
    SubcategoryComponent,
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
    PaymentAccountDataPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    QuillModule.forRoot(),
    AdminModule,
    FormsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    },
    {
      provide: LOCALE_ID,
      useValue: 'uk'
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
