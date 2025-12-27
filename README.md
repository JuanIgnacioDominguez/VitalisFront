# 🩺 Vitalis — App móvil de citas médicas

<div align="center">

![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![React Navigation](https://img.shields.io/badge/React_Navigation-000000?style=for-the-badge&logo=react&logoColor=white)
![NativeWind](https://img.shields.io/badge/NativeWind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

*Experiencia móvil para reservar turnos con profesionales de salud, gestionar favoritos y administrar tu perfil.*

</div>

---

## 📖 Descripción del Proyecto

**Vitalis** es una app móvil (React Native + Expo) para agendar turnos médicos, explorar profesionales por especialidad, guardar favoritos y administrar el perfil del paciente. Incluye autenticación, recuperación de contraseña, calificación de la app, soporte multi-idioma (ES/EN), detección de conectividad y modo oscuro.

---

## 🏗️ Arquitectura del Proyecto

| Repositorio | Descripción | Plataforma |
|-------------|-------------|------------|
| **VitalisFront** (este repo) | Frontend móvil — Expo + React Native | Android / iOS / Web (Expo) |
| **[Vitalis-Back](https://github.com/JuanIgnacioDominguez/Vitalis-Back)** | Backend — API REST | `http://localhost:4002` |

### Conexión con el Backend

Las peticiones HTTP se realizan con **Axios** usando la URL base definida en [src/utils/constants.js](src/utils/constants.js) (`http://10.0.2.2:4002/` para emulador Android). Ajusta el host a la IP/LAN de tu backend si usas dispositivo físico.

---

## 🚀 Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| **Expo** | Toolchain y bundler para mobile/web |
| **React Native 0.79 / React 19** | UI móvil |
| **Redux Toolkit + React Redux** | Estado global (auth, turnos, profesionales, favoritos, horarios, perfil) |
| **React Navigation (Stack + Bottom Tabs)** | Navegación principal y tabs inferiores |
| **NativeWind / Tailwind CSS** | Estilos con utilidades y theming |
| **Axios** | Cliente HTTP y manejo de tokens |
| **AsyncStorage** | Persistencia ligera (idioma, sesión) |
| **NetInfo** | Detección offline y popup de red |
| **Expo Image Picker** | Carga de foto de perfil |

---

## 🧩 Estructura del Proyecto

```
src/
├── api/                # Clientes HTTP (auth, turnos, horarios, favoritos, rating, usuario)
├── components/         # UI reutilizable: Home, Appointments, User, PopUps, etc.
├── context/            # Providers de idioma, tema y red
├── hooks/              # Hooks personalizados (traducciones, turnos)
├── Navigation/         # Stack + Bottom Tabs
├── Redux/              # store y slices
├── translations/       # Diccionarios en/es
├── utils/              # Constantes y helpers
└── views/              # Pantallas principales (Home, Appointments, Favorites, User, Auth, Settings)
```

---

## 🔄 Redux — Gestión de Estado Global

| Slice | Descripción |
|-------|-------------|
| `auth` | Registro, login, token y usuario actual |
| `appointments` | Listado de turnos, agregado/eliminado y actualización de vencidos |
| `professionals` | Catálogo de profesionales y especialidades |
| `favorites` | Marcado y sincronización de favoritos por usuario |
| `timeSlots` | Horarios reservados por profesional/fecha |
| `editUser` | Actualización de perfil, foto y contraseña |

---

## ✨ Funcionalidades Principales

- **Onboarding y autenticación**: registro con verificación por código, login, recuperación y cambio de contraseña, cierre y eliminación de cuenta con código de seguridad.
- **Exploración de profesionales**: búsqueda por nombre/especialidad, banner destacado, grilla de especialidades y lista de médicos mejor valorados.
- **Gestión de turnos**: creación, detalle y cancelación; separación de estados (pendientes/finalizados), refresco automático y actualización de turnos vencidos en background.
- **Favoritos**: guardar/eliminar profesionales y sincronizar favoritos del usuario.
- **Agenda y horarios**: selector de día/mes, visualización de horarios ocupados y reserva de time slots.
- **Perfil y ajustes**: edición de datos personales, cambio de contraseña, actualización de foto de perfil, preferencias de idioma y tema.
- **Feedback y soporte**: calificación de la app, FAQs, política de privacidad, contacto al soporte.
- **Experiencia cuidada**: modo oscuro, soporte español/inglés persistido, detección offline con popup de red.

---

## 🛡️ Buenas Prácticas Implementadas

- **Componentización** de UI y reutilización de layouts por dominio (Home, Turnos, Usuario).
- **Separación de concerns**: lógica de datos en `api/` y `Redux/`, presentación en `components/` y `views/`.
- **Hooks personalizados** para traducciones y filtrado de turnos.
- **Rutas protegidas por flujo** usando React Navigation (stack + tabs) y verificación de sesión.
- **Persistencia ligera** con AsyncStorage para idioma y sesión; manejo de conectividad vía NetInfo.
- **Estilos consistentes** con NativeWind/Tailwind y soporte de tema claro/oscuro.

---

## 📦 Instalación y Ejecución

### Requisitos previos

- Node.js 18+ (recomendado 20)
- npm o yarn
- Backend **Vitalis-Back** corriendo en `localhost:4002`
- Emulador Android/iOS configurado o dispositivo físico con Expo Go

### Pasos

```bash
# 1) Clonar el repositorio
https://github.com/ThomasGiardina/VitalisFront.git
cd VitalisFront

# 2) Instalar dependencias
npm install

# 3) Configurar la URL del backend si es necesario
#    editar src/utils/constants.js

# 4) Levantar la app
npm run android   # emulador Android
npm run ios       # simulador iOS (macOS)
npm run web       # vista web con Expo
```

---

## ⚙️ Configuración de API

- URL base: definida en [src/utils/constants.js](src/utils/constants.js). 
- Emulador Android: `http://10.0.2.2:4002/` (loopback hacia host).
- Dispositivo físico: usar la IP LAN de tu máquina (por ej. `http://192.168.X.X:4002/`).

---

## 🧪 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run start` | Inicia Expo (elige plataforma desde QR/CLI) |
| `npm run android` | Inicia Expo apuntando a emulador Android |
| `npm run ios` | Inicia Expo en simulador iOS |
| `npm run web` | Ejecuta la app en modo web |
| `npm run prebuild` | Prebuild nativo de Expo |
| `npm run lint` | ESLint + Prettier en modo check |
| `npm run format` | ESLint --fix + Prettier --write |

---

## 🗄️ Backend — Vitalis Back

Repositorio: [Vitalis-Back](https://github.com/JuanIgnacioDominguez/Vitalis-Back)

- **Framework**: API REST (puerto `4002`).
- **Recursos clave**: autenticación, profesionales, turnos, horarios, favoritos, usuarios, ratings.

---

## 📄 Licencia

Proyecto educativo/desarrollado con fines académicos. Ajusta la licencia según las políticas de tu organización.

---

<div align="center">

**Hecho con ❤️ para ofrecer una experiencia de salud más cercana y móvil.**

</div>
