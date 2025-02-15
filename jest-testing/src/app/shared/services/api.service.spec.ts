import { TestBed } from "@angular/core/testing"
import { ApiService } from "./api.service"
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { IProduct } from "../types/product";
import { HttpErrorResponse, provideHttpClient } from "@angular/common/http";

describe('Api Service', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // ApiService; tests
  it('creates a service', () => {
    expect(apiService).toBeTruthy();
  });

  // getProducts; tests
  describe('getProducts', () => {
    it('should return list of products', () => {
      let products: IProduct[] | undefined;
      apiService.getProducts().subscribe((response) => {
        products = response;
      });
      const req = httpTestingController.expectOne(`${apiService.apiUrl}/products`);
      req.flush([{ id: '1', name: 'foo' }]);
      expect(products).toEqual([{ id: '1', name: 'foo' }]);
    });
  });

  // addProduct; tests
  describe('addProduct', () => {
    it('should return list of products', () => {
      let product: IProduct | undefined;
      apiService.addProduct('foo').subscribe((response) => {
        product = response;
      });
      const req = httpTestingController.expectOne(`${apiService.apiUrl}/products`);
      req.flush({ id: '1', name: 'foo' });
      expect(product).toEqual({ id: '1', name: 'foo' });
    });

    it('passes correct body and method', () => {
      let product: IProduct | undefined;
      apiService.addProduct('foo').subscribe((response) => {
        product = response;
      });
      const req = httpTestingController.expectOne(`${apiService.apiUrl}/products`);
      req.flush({ id: '1', name: 'foo' });
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ name: 'foo' });
    });

    it('throws an error in case of fail', () => {
      let actualError: HttpErrorResponse | undefined;
      apiService.addProduct('foo').subscribe({
        next: () => fail('Success should not be called'),
        error: (error) => actualError = error
      });

      const req = httpTestingController.expectOne(`${apiService.apiUrl}/products`);
      req.flush('Server Error', { status: 422, statusText: 'Unprocessible entity' });

      if (!actualError) throw Error('Error should be defined');

      expect(actualError.status).toEqual(422);
      expect(actualError.statusText).toEqual('Unprocessible entity');
    })
  });

});