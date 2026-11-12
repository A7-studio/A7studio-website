# Product

## Product Name

A7Studio, the personal portfolio and showcase of Samuel Gichu, at a7studio.dev.

## Problem

Samuel has shipped many products inside other businesses, and is now building AI powered applications and taking on freelance work. Today a recruiter or a client has no single place to see what he has shipped, what he is building and learning, and how to hire him.

## Target Users

- Recruiters and hiring teams, first, while Samuel is job hunting.
- Founders and businesses with a project, second, for freelance work.
- Later, clients of a consultancy.

## Primary User Journey

A visitor lands on the home page, sees who Samuel is and that he is available, opens a work story as proof, sees what he is building (jobmigo) and learning, then downloads the CV or makes contact.

## Core Features

- Home page: hero, employers, selected work, products, experience, learning, offers, contact.
- Work stories at `/work` with honest status labels and cleared screenshots only.
- Lab at `/lab` and product pages such as `/jobmigo`, with dated build logs and learning notes.
- Freelance offers backed by shipped work, with no prices.
- CV download.

## MVP

Shipped by specs 0003 to 0006. The site grows in three stages: a portfolio of shipped work and experience (now), a builder and freelancer with products, notes and offers (now), and a consultancy (later, after three paid client projects or a second person joins).

## Non-Goals

- No agency voice ("we") and no consultancy pages until stage three.
- No performance figures, revenue or claims Samuel has not confirmed.
- No hosting of product apps. jobmigo's app lives apart from this site, and `/jobmigo` is a product page only.
- No prices on offers.
- Lead capture is a separate scope item and is not part of this product definition yet.

## Success Criteria

- A recruiter can see the title, availability, CV and a timeline within a short scroll.
- A visitor can open jobmigo and see its honest status.
- Every claim on the site can be defended by Samuel in an interview.
- `check:static` passes, and the site meets WCAG 2.2 AA in both themes.

## Constraints

- Static site, prerendered with TanStack Start, with no backend or form.
- Samuel works alone, so content lives in typed files he edits.
- Screenshots appear only when marked cleared, and never show personal job data.
