export class CreateUserDto{
    readonly email: string;
    password: string;
    readonly image: string = null;
    readonly name: string;
    readonly role: number = 0;
}