import { IsString, IsEmail } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { ICar } from '../interface/cars.interface';

export class CarDto implements ICar {
  @ApiProperty({
    type: String,
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Enter car title',
    default: 'Malibu',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Enter car price',
    default: '35000$',
  })
  @IsString()
  price: string;

  @ApiProperty({
    type: String,
    description: 'Enter car color',
    default: '#111000',
  })
  @IsString()
  color: string;

  @ApiProperty({
    type: String,
    description: 'Enter car description',
    default: 'best of the best',
  })
  @IsString()
  description: string;
}

export class CurrentUserDto{
  @ApiProperty({
      type: String
  })
  @IsString()
  id: string;
}

export class CreateOrUpdateDto extends OmitType(CarDto, ['id']){}

export class CarIdDto extends PickType(CarDto, ['id']){}

