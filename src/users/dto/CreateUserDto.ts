export class CreateUserDto{
    readonly email: string;
    readonly password: string;
    readonly role: number = 0;
}