import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { BadRequestException, NotFoundException} from '@nestjs/common';


describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>

    beforeEach( async ()=>{
         
      const user: User[] = [];

     fakeUsersService = {
        find: (email:string) => {
          const filteredUsers = user.filter(user => user.email === email);
          return Promise.resolve(filteredUsers);
        },
        create: (email: string, password: string) => {
          const users = {id: Math.floor(Math.random()*9999),email, password} as User;
          user.push(users);
          return Promise.resolve(users);
        }
    };


    const module = await Test.createTestingModule({
        providers:[AuthService,
        {
            provide: UsersService,
            useValue: fakeUsersService
        }]
    }).compile();
    
        service = module.get(AuthService)
    })
    
    it('can create an instance of an auth service' , async () =>{
        expect(service).toBeDefined();
    })

    it('created new user with salted password and email', async () => {
        const user = await service.signup('asdf@asd.pl', 'asdadad');

        expect(user.password).not.toEqual('asdadad');
        const [salt,hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();

    })

    it('throws an error if user signs up with email that is in use', async () => {
      await service.signup('asdf@asdf.com', 'asdf');
      await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
        BadRequestException,
      );
    });
   
    it('throws if signin is called with an unused email', async () => {
      await expect(
        service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
      ).rejects.toThrow(NotFoundException);
    });
   
    it('throws if an invalid password is provided', async () => {
      await service.signup('laskdjf@alskdfj.com', 'password');
      await expect(
        service.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
      ).rejects.toThrow(BadRequestException);
    });

      it('return a user if correct password is provided', async ()=> { 
       
        await service.signup('qwe@qwe.pl','qweqwe');

        // fakeUsersService.find = () =>  Promise.resolve([ 
        //   {email:'asd@asd.com', password: 'asdasd'} as User]);

      const user = await service.signin('qwe@qwe.pl','qweqwe');
      expect(user).toBeDefined();
    })

});

