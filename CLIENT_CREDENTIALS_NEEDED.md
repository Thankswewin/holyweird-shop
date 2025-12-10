# HolyWeird Platform - Required Credentials & Accounts

> **For Client**: Please provide the following credentials to complete the e-commerce platform setup.

---

## 1. Supabase (Database & Authentication)
**What it is**: Cloud database service that stores products, orders, and customer data.

**What we need**:
| Credential | Where to find it |
|------------|------------------|
| `SUPABASE_URL` | Project Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Project Settings → API → anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → service_role key (keep secret!) |

**How to get it**:
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (any name, choose a region close to your customers)
3. Wait for project to initialize (~2 minutes)
4. Go to **Project Settings** → **API** and copy the values above

**Cost**: Free tier includes 500MB database, 1GB file storage, 50,000 monthly active users

---

## 2. Stripe (Payment Processing)
**What it is**: Payment gateway for accepting credit card payments.

**What we need**:
| Credential | Where to find it |
|------------|------------------|
| `STRIPE_SECRET_KEY` | Developers → API Keys → Secret key |
| `STRIPE_PUBLISHABLE_KEY` | Developers → API Keys → Publishable key |
| `STRIPE_WEBHOOK_SECRET` | Developers → Webhooks → Signing secret (after setup) |

**How to get it**:
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete business verification (name, address, bank details for payouts)
3. Go to **Developers** → **API Keys**
4. Start with **Test mode** keys for development
5. Switch to **Live mode** when ready to accept real payments

**Cost**: 2.9% + 30p per transaction (UK), no monthly fees

---

## 3. Domain & Hosting (Optional - if not using provided)
**Current domain**: `holyweirdshop.tech`

**What we need** (if client manages DNS):
| Item | Details |
|------|---------|
| Domain registrar login | To configure DNS records |
| Hosting preference | Vercel (recommended), Netlify, or custom |

---

## 4. Email Service (For order confirmations) - OPTIONAL
**Options** (choose one):

### SendGrid
| Credential | Where to find it |
|------------|------------------|
| `SENDGRID_API_KEY` | Settings → API Keys |

### Resend (simpler alternative)
| Credential | Where to find it |
|------------|------------------|
| `RESEND_API_KEY` | API Keys page |

---

## 5. Business Information Needed

| Information | Example |
|-------------|---------|
| Legal business name | HolyWeird Technology Ltd |
| Business email | info@holyweirdshop.tech |
| Business address | For invoices/shipping labels |
| Return policy URL | Or provide text for us to add |
| Shipping rates | UK, EU, International pricing |

---

## Summary Checklist

- [ ] **Supabase** account created, project set up, 3 API keys copied
- [ ] **Stripe** account created, business verified, API keys copied
- [ ] **Domain** access confirmed (if managing DNS)
- [ ] **Business info** provided (email, address, policies)

---

## Questions?

Once you have these credentials, send them securely (not via plain email). Options:
- Password-protected document
- Secure messaging app
- Temporary secret sharing link (e.g., onetimesecret.com)

**Note**: Never share `SERVICE_ROLE_KEY` or `SECRET_KEY` publicly - these give full access to your database and payment system.
