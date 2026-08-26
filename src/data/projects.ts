export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  accent: string; // css var name
  description: string;
  purpose: string;
  users: string[];
  benefits: string[];
  features: { title: string; description: string; icon: string }[];
  functionalities?: { title: string; points: string[] }[];
  workflow: string[];
  tech: string[];
  heroImage: string;
  gallery: string[];
};

// Curated Unsplash imagery per project theme
const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const projects: Project[] = [
  {
    slug: "doctor-connect",
    name: "Doctor Connect",
    tagline: "A complete healthcare platform connecting patients and doctors",
    category: "Healthcare",
    accent: "emerald",
    description:
      "Doctor Connect bridges patients, physicians and clinics on a single secure platform for appointments, consultations and digital medical records.",
    purpose:
      "Modernize outpatient care by removing friction between patients and healthcare providers — from discovery and booking to consultation and follow-up.",
    users: ["Patients", "Doctors & Specialists", "Hospital Admins", "Clinic Front-desk Staff"],
    benefits: [
      "Faster appointment booking",
      "Digital, portable medical records",
      "Reduced no-shows via reminders",
      "Secure doctor-patient messaging",
      "Insight dashboards for clinics",
      "Better patient retention",
    ],
    features: [
      { title: "Secure Authentication", description: "Role-based login for patients, doctors and administrators.", icon: "shield" },
      { title: "Patient Dashboard", description: "One place for appointments, prescriptions and history.", icon: "layout" },
      { title: "Doctor Dashboard", description: "Manage schedule, consultations and patient queue.", icon: "stethoscope" },
      { title: "Doctor Search", description: "Filter by speciality, location, availability and rating.", icon: "search" },
      { title: "Doctor Profiles", description: "See qualification, experience, consultation fee and available slots before booking.", icon: "stethoscope" },
      { title: "Appointment Booking", description: "Real-time slot booking with instant confirmations.", icon: "calendar" },
      { title: "Medical Records", description: "Structured records with attachments and prescriptions.", icon: "file" },
      { title: "Prescription Management", description: "Digital prescriptions issued directly to patients.", icon: "pill" },
      { title: "Notifications", description: "SMS, email and in-app reminders for every visit.", icon: "bell" },
      { title: "Admin Panel", description: "Analytics, user management and revenue reporting.", icon: "gauge" },
    ],
    functionalities: [
      { title: "User Registration & Login", points: ["Separate secure accounts for patients, doctors and administrators", "Protected role-based access"] },
      { title: "Patient & Doctor Profiles", points: ["Patient profile, contact information and medical history", "Doctor name, specialization, experience, qualification, availability and consultation fee"] },
      { title: "Doctor Search & Booking", points: ["Search by specialization, hospital, location and availability", "Choose doctor, date and available time, then confirm booking"] },
      { title: "Appointment Management", points: ["View, reschedule and cancel appointments", "Keep a complete appointment history for patients and doctors"] },
      { title: "Medical Records & Notifications", points: ["Consultation history, prescriptions and medical reports", "Confirmation, cancellation and upcoming appointment reminders"] },
      { title: "Admin Panel", points: ["Manage doctors and patients", "View appointments and monitor complete system activity"] },
    ],
    workflow: [
      "Sign in securely",
      "Search doctors by speciality",
      "View doctor profile & availability",
      "Book appointment slot",
      "Attend consultation",
      "Records & prescription updated",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind", "AWS", "Twilio"],
    heroImage: img("photo-1576091160399-112ba8d25d1d"),
    gallery: [
      img("photo-1576091160550-2173dba999ef"),
      img("photo-1584982751601-97dcc096659c"),
      img("photo-1631815589968-fdb09a223b1e"),
      img("photo-1579684385127-1ef15d508118"),
    ],
  },
  {
    slug: "medistock",
    name: "MediStock",
    tagline: "Pharmacy management, inventory and billing — unified",
    category: "Healthcare",
    accent: "cyan",
    description:
      "MediStock is an end-to-end pharmacy management platform for medicine inventory, prescriptions, billing and business reporting.",
    purpose:
      "Give independent pharmacies and chains an enterprise-grade back-office that eliminates stock errors and accelerates billing.",
    users: ["Pharmacy Owners", "Pharmacists", "Cashiers", "Regional Managers"],
    benefits: [
      "Real-time stock visibility",
      "Zero stock-out with reorder alerts",
      "Faster checkout & billing",
      "Prescription verification workflow",
      "Sales & revenue analytics",
      "Compliant medicine records",
    ],
    features: [
      { title: "Authentication", description: "Role-based access for owners, pharmacists and cashiers.", icon: "shield" },
      { title: "Live Dashboard", description: "Revenue, top-selling SKUs and low-stock alerts at a glance.", icon: "gauge" },
      { title: "Medicine Inventory", description: "Batch, expiry and supplier tracking on every SKU.", icon: "package" },
      { title: "Stock Management", description: "Reorder points, transfers and automated purchase orders.", icon: "boxes" },
      { title: "Customer Management", description: "Buyer profiles with purchase and prescription history.", icon: "users" },
      { title: "Prescription Verification", description: "Attach and verify prescriptions before dispensing.", icon: "clipboard" },
      { title: "Billing & Invoicing", description: "GST-ready invoices with barcode scanning.", icon: "receipt" },
      { title: "Sales & Reports", description: "Daily, weekly and monthly business reports.", icon: "chart" },
      { title: "Low-stock Alerts", description: "Stay ahead of stock-outs with clear restock and expiry notifications.", icon: "bell" },
    ],
    functionalities: [
      { title: "Authentication & Pharmacy Dashboard", points: ["Secure login for pharmacy staff and administrators", "See total medicines, available and low stock, daily sales, customers and recent transactions"] },
      { title: "Medicine Inventory Management", points: ["Add, update, delete and view medicine information", "Search and categorize medicines for fast counter operations"] },
      { title: "Stock Management", points: ["Monitor stock quantity and inventory movement", "Low-stock alerts, out-of-stock notifications and restock control"] },
      { title: "Customer & Prescription Management", points: ["Add, edit and search customers with purchase history", "Upload, link, verify and retain prescription history"] },
      { title: "Billing & Invoice Generation", points: ["Calculate bills and apply taxes or discounts", "Generate, save and print PDF invoices"] },
      { title: "Sales & Reports", points: ["Record sales, view daily/monthly sales and revenue history", "Generate sales, stock, customer and revenue reports"] },
    ],
    workflow: [
      "Sign in",
      "Open dashboard",
      "Add / verify medicines",
      "Manage stock levels",
      "Customer purchase",
      "Prescription verification",
      "Generate invoice",
      "Update sales & reports",
    ],
    tech: ["React", "TypeScript", "Node.js", "MySQL", "Docker", "Chart.js"],
    heroImage: img("photo-1587854692152-cbe660dbde88"),
    gallery: [
      img("photo-1587854692152-cbe660dbde88"),
      img("photo-1585435557343-3b092031a831"),
      img("photo-1631549916768-4119b2e5f926"),
      img("photo-1563213126-a4273aed2016"),
    ],
  },
  {
    slug: "visakha-beauty",
    name: "Visakha Beauty",
    tagline: "Luxury salon management for a five-star customer experience",
    category: "Salon & Wellness",
    accent: "rosegold",
    description:
      "Visakha Beauty is a modern salon management platform covering appointments, staff, services, billing and customer experience.",
    purpose:
      "Bring boutique salons on par with international beauty brands through elegant software that removes daily operational friction.",
    users: ["Salon Owners", "Beauticians & Stylists", "Front-desk", "Customers"],
    benefits: [
      "Frictionless appointment booking",
      "Staff productivity insights",
      "Automated billing",
      "Customer retention via history",
      "Transparent earnings tracking",
      "Beautiful, on-brand experience",
    ],
    features: [
      { title: "Authentication", description: "Secure sign-in for owners, staff and customers.", icon: "shield" },
      { title: "Elegant Dashboard", description: "A calm command center for the day's operations.", icon: "layout" },
      { title: "Customer Management", description: "Profiles, preferences and full visit history.", icon: "users" },
      { title: "Employee Management", description: "Rosters, specialities and performance tracking.", icon: "briefcase" },
      { title: "Service Catalogue", description: "Curated services, packages and pricing.", icon: "sparkles" },
      { title: "Appointment Booking", description: "Real-time bookings with staff auto-assignment.", icon: "calendar" },
      { title: "Billing System", description: "Fast checkout with discounts and packages.", icon: "receipt" },
      { title: "Earnings Management", description: "Track per-staff and per-service earnings.", icon: "wallet" },
      { title: "Reports & Insights", description: "Revenue, retention and service performance.", icon: "chart" },
      { title: "Customer History", description: "See visits, services, invoices, payments and appointment history in one profile.", icon: "file" },
      { title: "Quick Search", description: "Find customers, phone numbers, employees and services without leaving the workflow.", icon: "search" },
      { title: "Action Notifications", description: "Clear confirmation messages for bookings, bills and customer updates.", icon: "bell" },
    ],
    workflow: [
      "Sign in",
      "Open dashboard",
      "Manage customers",
      "Book appointment",
      "Assign employee",
      "Provide service",
      "Generate bill",
      "Save history & earnings",
      "Reports",
    ],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind", "Stripe"],
    heroImage: img("photo-1560066984-138dadb4c035"),
    gallery: [
      img("photo-1560066984-138dadb4c035"),
      img("photo-1522337360788-8b13dee7a37e"),
      img("photo-1487412720507-e7ab37603c6f"),
      img("photo-1610992015732-2449b76344bc"),
    ],
  },
  {
    slug: "venture-plus",
    name: "Venture+",
    tagline: "Real estate CRM for luxury property management",
    category: "Real Estate",
    accent: "indigo",
    description:
      "Venture+ is a premium real estate platform covering property inventory, lead pipelines, bookings, documents and ownership transfers.",
    purpose:
      "Give real estate businesses a single, elegant system to manage inventory, sales pipelines and post-sale operations.",
    users: ["Developers", "Real Estate Agencies", "Sales Teams", "Property Managers"],
    benefits: [
      "Centralised property inventory",
      "Lead lifecycle tracking",
      "Booking automation",
      "Secure document vault",
      "Employee performance visibility",
      "Business analytics",
      "Ownership transfer workflow",
    ],
    features: [
      { title: "Authentication", description: "Role-based access for teams and clients.", icon: "shield" },
      { title: "Executive Dashboard", description: "KPIs across inventory, leads and sales.", icon: "gauge" },
      { title: "Property Management", description: "Rich property records with media galleries.", icon: "building" },
      { title: "Property Search", description: "Smart filters and map-based discovery.", icon: "search" },
      { title: "Customer Management", description: "Complete buyer profiles and interactions.", icon: "users" },
      { title: "Employee Management", description: "Assign responsibilities, maintain profiles and monitor team activity.", icon: "briefcase" },
      { title: "Lead Management", description: "Kanban pipelines with reminders and notes.", icon: "target" },
      { title: "Booking Management", description: "End-to-end booking flow with payments.", icon: "calendar" },
      { title: "Document Vault", description: "Secure agreements and KYC storage.", icon: "file" },
      { title: "Performance Tracking", description: "Individual and team-level performance.", icon: "chart" },
      { title: "Ownership Transfer", description: "Structured handover with audit trail.", icon: "key" },
      { title: "Admin Management", description: "Securely manage departments, records, activity and organization-wide reports.", icon: "shield" },
    ],
    functionalities: [
      { title: "Authentication & Dashboard", points: ["Secure customer, employee and administrator login", "Business overview for properties, active customers, employees, sales and bookings"] },
      { title: "Property Management & Search", points: ["Add, edit, delete properties; upload images, set price and availability", "Filter properties by location, budget, type, bedrooms and status"] },
      { title: "Customer & Employee Management", points: ["Customer inquiries, purchase history and follow-up management", "Employee profiles, responsibilities and performance monitoring"] },
      { title: "Lead & Booking Management", points: ["Store inquiries, assign leads, schedule follow-ups and convert leads", "Property booking, confirmation, history and cancellation"] },
      { title: "Documents & Admin Operations", points: ["Store agreements, ownership, customer and property documents", "Manage departments, records, activity and organization-wide reports"] },
      { title: "Performance, Ownership & Reports", points: ["Track tasks, projects, efficiency ratings and performance reviews", "Transfer ownership when an employee leaves, prevent data loss and retain ownership history", "Generate property, customer, sales, employee and revenue reports"] },
    ],
    workflow: [
      "Sign in",
      "Open dashboard",
      "Manage properties",
      "Customer inquiry",
      "Lead management",
      "Property booking",
      "Sales process",
      "Reports & analytics",
    ],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Mapbox", "AWS S3"],
    heroImage: img("photo-1560518883-ce09059eeffa"),
    gallery: [
      img("photo-1560518883-ce09059eeffa"),
      img("photo-1512917774080-9991f1c4c750"),
      img("photo-1600585154340-be6161a56a0c"),
      img("photo-1600607687939-ce8a6c25118c"),
    ],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
