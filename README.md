# 🏨 Lumière Hotels

Plataforma web premium de reservas hoteleras desarrollada con **Next.js 16**, **React 19** y **TypeScript**. Incluye flujo completo de reservas con pagos a través de **Stripe**, autenticación con **NextAuth** (Google OAuth + credenciales), emails transaccionales con **Resend** y panel de administración.

## ✨ Características

- **Booking Wizard** — Flujo de reserva en 4 pasos con selección de hotel, habitación, extras y pago
- **Pagos con Stripe** — Checkout seguro con webhooks para confirmación automática
- **Autenticación** — Google OAuth + registro con email/contraseña (bcrypt)
- **Panel Admin** — Dashboard con KPIs, gestión de reservas, estadísticas de ingresos
- **Emails** — Confirmación de reserva, notificación al admin, cancelación (Resend)
- **SEO** — Meta tags, Open Graph, sitemap.xml, robots.txt
- **Dark/Light Mode** — Tema persistente con toggle
- **Responsive** — Diseño adaptativo con menú hamburguesa móvil
- **3D Hero** — Animación Three.js en la página principal

## 🛠 Stack Tecnológico

| Categoría | Tecnología |
|-----------|-----------|
| Framework | Next.js 16 (App Router) |
| Frontend | React 19, TypeScript |
| Base de Datos | PostgreSQL (Supabase) + Prisma ORM |
| Autenticación | NextAuth.js v4 |
| Pagos | Stripe Checkout + Webhooks |
| Emails | Resend |
| 3D | Three.js + React Three Fiber |
| Animaciones | Framer Motion |
| Deploy | Vercel |

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta de [Supabase](https://supabase.com) (PostgreSQL)
- Cuenta de [Stripe](https://stripe.com)
- Cuenta de [Resend](https://resend.com)
- Credenciales de [Google OAuth](https://console.cloud.google.com)

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/lumiere-hotels.git
cd lumiere-hotels

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Generar cliente Prisma y aplicar migraciones
npx prisma generate
npx prisma db push

# 5. (Opcional) Sembrar datos iniciales
npx prisma db seed

# 6. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## 🔐 Variables de Entorno

Consulta [`.env.example`](.env.example) para ver todas las variables necesarias:

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | URL de conexión Supabase (con pgbouncer) |
| `DIRECT_URL` | URL directa Supabase (para migraciones) |
| `NEXTAUTH_SECRET` | Secreto para firmar JWT |
| `NEXTAUTH_URL` | URL base de la app |
| `GOOGLE_CLIENT_ID` | ID de cliente Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Secreto de cliente Google OAuth |
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe |
| `STRIPE_WEBHOOK_SECRET` | Secreto del webhook de Stripe |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clave pública de Stripe |
| `RESEND_API_KEY` | API Key de Resend |
| `EMAIL_FROM` | Dirección de remitente para emails |
| `ADMIN_EMAIL` | Email del usuario administrador |
| `ADMIN_PASSWORD` | Contraseña del usuario administrador |

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Rutas (App Router)
│   ├── api/                # API Routes
│   │   ├── auth/           # NextAuth + registro
│   │   ├── admin/          # Stats y bookings (admin)
│   │   ├── bookings/       # CRUD de reservas
│   │   ├── hotels/         # Listado de hoteles
│   │   └── stripe/         # Webhook de Stripe
│   ├── booking/            # Wizard de reservas
│   ├── admin/              # Panel de administración
│   ├── account/            # Login/registro/perfil
│   ├── hotels/             # Catálogo de hoteles
│   └── ...                 # Otras páginas
├── components/             # Componentes React
├── data/                   # Datos estáticos (SEO, contenido)
├── hooks/                  # Custom hooks
└── lib/                    # Utilidades (db, stripe, email)
prisma/
└── schema.prisma           # Esquema de base de datos
```

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Linter (ESLint) |

## 🗄 Modelos de Base de Datos

- **User** — Usuarios con roles (USER/ADMIN)
- **Hotel** — Hoteles con ubicación, rating, amenities
- **Room** — Habitaciones con tipo, capacidad, precio
- **Season** — Temporadas con multiplicadores de precio
- **Booking** — Reservas con estado y sesión de Stripe
- **Review** — Reseñas de huéspedes
- **BlogPost** — Artículos del blog
- **Experience** — Experiencias disponibles
- **FAQ** — Preguntas frecuentes

## 📄 Licencia

Este proyecto es privado y de uso exclusivo.
