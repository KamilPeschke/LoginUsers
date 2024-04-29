import { Min, Max, IsLongitude, IsLatitude, IsNumber, IsString} from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateReportDto{
  
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1970)
    @Max(2050)
    year: number;

    @IsLongitude()
    lng: number;
    
    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

}