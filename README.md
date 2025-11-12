# 🐄 Sistema Integral de Gestión de Ganado y Ventas para Productores Rurales

## 📖 Descripción del Proyecto

Este repositorio contiene el código fuente de un **Sistema Integral de Gestión de Ganado y Ventas para Productores Rurales**, desarrollado como parte del pre-proyecto de la **Tecnicatura Superior en Análisis de Sistemas**.

El objetivo principal es proporcionar a los productores rurales una herramienta digital eficiente para optimizar la administración de sus operaciones ganaderas, incluyendo el **registro de animales (Alta, Baja, Modificación)** y la gestión de información clave (**peso, raza, estado sanitario**).

La aplicación está diseñada con la arquitectura **Standalone Components de Angular** para garantizar un desarrollo moderno, modular y fácil de mantener.

---

## 🛠️ Tecnologías Utilizadas

| Categoría        | Tecnología                      |
|------------------|----------------------------------|
| **Frontend**     | Angular (Standalone Components)  |
| **Lenguaje**     | TypeScript                       |
| **Despliegue**   | Vercel                           |

---

## 🚀 Acceso al Sistema (En Producción)

El sistema ha sido desplegado automáticamente en la plataforma **Vercel**.

| Entorno | URL de Acceso |
|----------|---------------|
| **Producción** | [https://pag-web-proyecto.vercel.app/](https://pag-web-proyecto.vercel.app/) |

---

## 📦 Estructura del Proyecto (Reflejando el Repositorio)

La estructura del proyecto sigue una organización modular de Angular, incorporando las carpetas de documentación del pre-proyecto dentro de la estructura de la aplicación (`src/app/`).

```
Pag-Web-Proyecto/
├── src/
│   ├── app/
│   │   ├── acerca-de/          # Componentes relacionados con la sección "Acerca de" (Documentación)
│   │   ├── components/         # Componentes principales del sistema (Alta, Listado, etc.)
│   │   ├── funcionalidades/    # Componentes o documentación de funcionalidades clave
│   │   ├── metodologia/        # Componentes o documentación de la metodología utilizada
│   │   ├── models/             # Definición de interfaces de datos (Animal)
│   │   ├── problemas/          # Componentes o documentación de la problemática inicial
│   │   ├── services/           # Servicios para la lógica de negocio y gestión de datos
│   │   ├── app.component.ts    # Componente principal que orquesta la aplicación
│   │   └── app.routes.ts       # Definición de rutas de la aplicación
│   ├── assets/                 # Imágenes y archivos estáticos (logos, fondos, etc.)
│   └── main.ts                 # Punto de entrada de la aplicación Standalone
├── README.md
├── package.json
└── ... (Archivos de configuración de Angular)
```

---

## ⚙️ Configuración e Instalación Local

Para correr el proyecto en tu máquina local, sigue los siguientes pasos:

### 1️⃣ Clonar el repositorio:
```bash
git clone https://github.com/sofiagatica/Pag-Web-Proyecto
cd Pag-Web-Proyecto
```

### 2️⃣ Instalar dependencias:
```bash
npm install
```

### 3️⃣ Ejecutar la aplicación:
```bash
ng serve
```

La aplicación se ejecutará en **http://localhost:4200/**.

---

## 🤝 Contribuciones y Contacto

¡Las contribuciones son bienvenidas! Si deseas mejorar o expandir el sistema, por favor crea un **Pull Request**.

**Alumna:** Gatica Nahara Sofía  
**Ciclo Lectivo:** 2025




