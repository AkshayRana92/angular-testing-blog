import { AppService } from './app.service';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {BaseRequestOptions, Http, Headers, ResponseOptions, Response} from '@angular/http';
import { async, TestBed } from '@angular/core/testing';

fdescribe('App service should', function () {

  let service: AppService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        }
      ]
      });

    service = TestBed.get(AppService);
    mockBackend = TestBed.get(MockBackend);
  });

  it('get initialized', () => expect(service).toBeDefined() );

  it('be able to get data', () =>  {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: [{name : 'Jerry'},{name : 'George'},{name : 'Elaine'},{name : 'Kramer'}],
            status: 200,
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          })));
      });
    service.getData().subscribe(data => {
      expect(data).toEqual([{name : 'Jerry'},{name : 'George'},{name : 'Elaine'},{name : 'Kramer'}]);
    });
  });

  it('not be able to get data', async(() => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockError(new Error());
      });
    service.getData().subscribe(data => data,
      error => {
      expect(error.toString()).toContain('Something went wrong. Please try again later.');
    });
  }));

});
