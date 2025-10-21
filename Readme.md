# 🧱 Guía de Instalación y Configuración del Proyecto

Este documento describe los pasos para configurar los entornos **Docker**, **Backend (Laravel)** y **Frontend (Quasar y Flutter)**, junto con las librerías utilizadas y comandos útiles de mantenimiento.

---

## 🐳 1. Docker

### 🔁 Reiniciar y eliminar contenedores e imágenes

```
docker-compose down --rmi all
```

### 🔁 Levantar contenedores

```
docker compose up --build -d
```

### 🧹 Bajar contenedores y eliminar volumenes

```
docker compose down -v
```

### 🧹 Eliminar imágenes no utilizadas

```
docker image prune -a
docker image prune
```

### ⚙️ Instalar make

```
sudo apt install make
```

### 🧾 Dar formato al archivo .env de docker-compose.yml

Corrige los saltos de línea en el archivo `.env` (necesario si fue editado en Windows):

```
sudo apt update
sudo apt install dos2unix
dos2unix .env
sed -i 's/\r$//' .env
```

---

## 🖥️ 2. Backend (Laravel)

### 🚀 Crear proyecto Laravel

```
docker exec -it {{container}}_admin bash
composer create-project laravel/laravel .
php artisan key:generate
php artisan migrate
php artisan migrate:fresh --seed
php artisan optimize
php artisan optimize:clear
```

### 📦 Manejo de dependencias

**Eliminar carpeta vendor:**

```
sudo rm -rf vendor
```

**Instalar dependencias:**

```
composer install
```

---

### 📚 Librerías recomendadas

#### 🔹 Módulos (Nwidart)

```
composer require nwidart/laravel-modules
php artisan vendor:publish --provider="Nwidart\Modules\LaravelModulesServiceProvider"
php artisan vendor:publish --tag=laravel-assets --ansi --force
```

Modificar composer.json:

```
"extra": {
  "laravel": {
    "dont-discover": []
  },
  "merge-plugin": {
    "include": [
      "Modules/*/composer.json"
    ]
  }
}
```

**Publicar stubs:**

```
php artisan stub:publish
```

#### 🔹 Laravel Excel

```
composer require maatwebsite/excel
php artisan vendor:publish --provider="Maatwebsite\\Excel\\ExcelServiceProvider" --tag=config
```

#### 🔹 QR Codes

```
composer require simplesoftwareio/simple-qrcode
```

#### 🔹 Roles y Permisos (Spatie)

```
composer require spatie/laravel-permission
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

#### 🔹 Data (Spatie)

```
composer require spatie/laravel-data
php artisan vendor:publish --provider="Spatie\LaravelData\LaravelDataServiceProvider" --tag="data-config"
```

#### 🔹 Livewire

```
composer require livewire/livewire
php artisan livewire:publish --config
```

---

### 🧩 Migraciones y Seeders

**Reiniciar migraciones con seeder:**

```
php artisan migrate:fresh --seed
```

**Ejecutar migraciones y seeders de un módulo específico:**

```
php artisan module:migrate-refresh --seed User
```

---

### 🧠 Uso de atributos en consultas personalizadas en BaseService

#### 🔸 En getModel()

```
select: ['*']
addSelect: ['hola' => DB::raw("'holiwi' AS prueba")]
paginate: [cant_elements, ['*'], 'page', number_page]
whereRaw: [['status = ?', [1]], 'DATE(created_at) >= "2025-08-20"']
orders: [['id', 'desc'], ['created_at', 'asc']]
orderByRaw: 'id desc, created_at asc'
```

#### 🔸 En getModelsUnion()

Combina múltiples modelos:

```
models: [Model1::class, Model2::class]
```

---

## 🌐 3. Frontend (Quasar)

### 🚀 Crear proyecto

```
docker-compose run frontend bash
npm init quasar
npm i
```

### 📦 Librerías recomendadas

```
yarn add pinia-plugin-persistedstate
yarn add vue-gtag
```

---

## 🎨 4. Paleta de Colores

| Color           | Hex     |
| --------------- | ------- |
| Color principal  | #061238 |
| Color principal claro | #90acba |
| Color secundario   | #f7947f |
| Amarillo suave  | #fdf8ce |
| Amarillo cálido | #fae590 |
| Verde suave     | #95c5a9 |
| Rosa claro      | #f7e1ee |
| Color texto     | #4D4D4D |

---

## ✅ 5. Comandos útiles

| Descripción                    | Comando                    |
| ------------------------------ | -------------------------- |
| Generar stubs de Laravel       | php artisan stub:publish   |
| Optimizar aplicación           | php artisan optimize       |
| Limpiar caché y optimizaciones | php artisan optimize:clear |

---

## 📁 6. Estructura de contenedores recomendada

```
yarn_library/
├── backend/     # Proyecto Laravel
├── frontend/    # Proyecto Quasar
├── mobile/      # Proyecto Flutter (versión mobile)
├── media/       # Archivos subidos
└── db/          # Base de datos (MySQL)
```

---

> 🧩 **Notas finales:**
> * Usa `make` para automatizar tareas frecuentes como levantar contenedores, instalar dependencias o correr migraciones.
