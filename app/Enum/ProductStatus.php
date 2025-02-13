<?php

namespace App\Enum;

enum ProductStatus: string
{
    case AVAILABLE = 'available';
    case OUT = 'out';
    case DISCONTINUED = 'discontinued';
}
