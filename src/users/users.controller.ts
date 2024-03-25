import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, Session} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update.user.dto';
import { CreateUserDto } from './dtos/create.user.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from '../interceptors/serialized.interceptor';
import { UserDto } from './dtos/user.dto';
import {Serialize} from '../interceptors/serialized.interceptor'
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current.user.decorator';
import { User } from './users.entity';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {

    constructor(private userService: UsersService,
                private authService: AuthService){}


    // @Get('/whoami')
    // whoAmI(@Session() session:any){
    //     return this.userService.findOne(session.userId);
    // }

    @Get('/whoami')
    whoAmI(@CurrentUser() user: User){
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any){
        session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() create: CreateUserDto, @Session() session: any){
        const user = await this.authService.signup(create.email, create.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body:CreateUserDto, @Session() session: any){
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }


    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Get('/:id')
    async findUser(@Param('id')id: string){
        // console.log('Handler is running');
        const user = await this.userService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body:UpdateUserDto ){
        return this.userService.update(parseInt(id), body);
    }
}
