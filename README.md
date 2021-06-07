# Todo App


## Vista previa del proyecto
!["preview"](https://github.com/JulioAltamiranda/ToDo-App/blob/master/public/img/Screenshot%202021-06-07%20164720.png "preview")	

!["preview"](https://github.com/JulioAltamiranda/ToDo-App/blob/master/public/img/Screenshot%202021-06-07%20164800.png "preview")	

!["preview"](https://github.com/JulioAltamiranda/ToDo-App/blob/master/public/img/Screenshot%202021-06-07%20164836.png "preview")	

## Instalación
1. Selecciona un directorio en la pc para guardar el proyecto
2. Descarga el repositorio 
3. Descromprime la carpeta en el directorio
4. Accede a la carpeta descomprimida``
5. Crea un nuevo archivo llamado .env dentro del proyecto y copia el contenido del archivo .env.example a .env archivo nuevo que creaste
6. Crea una base de datos para el proyecto
7. Modifica las siguientes variables de conexion en el archivo .env que creaste:
* DB_DATABASE=tubasededatos
* DB_USERNAME=tunombredeusuario
* DB_PASSWORD=tucontrasenia

8. Carga las dependencias del proyecto con el comando:  
```
composer install
```
```
npm install
```
9. Genera una llave para el proyecto: `php artisan key:generate`
10. Ejecuta las migraciones:  
```
php artisan migrate 
```
11. Ejecuta el servidor: `php artisan serve`

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
