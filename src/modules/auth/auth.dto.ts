import { ApiProperty } from "@nestjs/swagger";

export class SignUpDTO{
    @ApiProperty({
        description : "The Email for login (unique)",
        type: String,
    })
    readonly email: string;

    @ApiProperty({
        description : "The phone number",
        type: String
    })
    readonly phone:string;

    @ApiProperty({
        description : "The PW you want",
        type: String,
    })
    readonly password: string;

    @ApiProperty({
        description : "The nickname you want",
        type: String,
    })
    readonly nickname : string;  
}

export class LoginDTO{
    @ApiProperty({
        description : "User Email",
        type: String,
    })
    readonly email: string;

    @ApiProperty({
        description : "User PW",
        type: String,
    })
    readonly password : string;
}