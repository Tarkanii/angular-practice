import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { UtilsService } from "./utils.service";
import { IUser } from "../types/user";

describe('User Service', () => {
  let userService: UserService;
  let utilsService: UtilsService;
  const utilsServiceMock = {
    pluck: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService, 
        UtilsService,
        { provide: UtilsService, useValue: utilsServiceMock }]
    });

    userService = TestBed.inject(UserService);
    utilsService = TestBed.inject(UtilsService);
  });

  // UserService; tests
  it('creates a service', () => {
    expect(userService).toBeTruthy();
  });

  // addUser; tests
  describe('addUser', () => {
    it('should add user', () => {
      const user: IUser = { id: '1', name: 'foo' };
      userService.addUser(user);
      expect(userService.users).toEqual([{ id: '1', name: 'foo' }]);
    });
  });

  // addUserRx; tests
  describe('addUserRx', () => {
    it('should add user', () => {
      const user: IUser = { id: '1', name: 'foo' };
      userService.addUserRx(user);
      expect(userService.users$.getValue()).toEqual([{ id: '1', name: 'foo' }]);
    });
  });

  // removeUser; tests
  describe('removeUser', () => {
    it('should remove user', () => {
      userService.users = [{ id: '1', name: 'foo' }];
      userService.removeUser('1');
      expect(userService.users).toEqual([]);
    });
  });

  // removeUserRx; tests
  describe('removeUser', () => {
    it('should remove user', () => {
      userService.users$.next([{ id: '1', name: 'foo' }]);
      userService.removeUserRx('1');
      expect(userService.users$.getValue()).toEqual([]);
    });
  });

  // getUsernames; tests
  describe('getUsernames', () => {
    it('should get usernames (mock)', () => {
      utilsServiceMock.pluck.mockReturnValue(['foo']);
      expect(userService.getUsernames()).toEqual(['foo']);
    });

    it('should get usernames (spy)', () => {
      jest.spyOn(utilsService, 'pluck');
      userService.users = [{ id: '1', name: 'foo' }];
      userService.getUsernames();
      expect(utilsService.pluck).toHaveBeenCalledWith(
        userService.users,
        'name'
      );
    });
  });

  // getUsernamesRx; tests
  describe('getUsernames', () => {
    it('should get usernames (mock)', () => {
      utilsServiceMock.pluck.mockReturnValue(['foo']);
      expect(userService.getUsernamesRx()).toEqual(['foo']);
    });

    it('should get usernames (spy)', () => {
      jest.spyOn(utilsService, 'pluck');
      userService.users$.next([{ id: '1', name: 'foo' }]);
      userService.getUsernamesRx();
      expect(utilsService.pluck).toHaveBeenCalledWith(
        userService.users$.getValue(),
        'name'
      );
    });
  });
})