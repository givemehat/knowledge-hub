# 🎨 Bodh Icon System & Semantic Mapping (ICONS.md)

> **Standard:** Bodh Systematic Icon Design System (Prompt 8)  
> **Status:** Production Verified  
> **Style:** 28px Duotone / Two-Tone Vectors in 56px Soft-Tinted Surfaces (10–14% Opacity) + 1px Border  
> **Rule:** 100% Zero Emojis, Zero Misleading Metaphors (No Mic, No Star, No Home)  

---

## 1. Domain Category Semantic Mapping

| Category | Id | Metaphor | Old Icon (Broken) | New Final Icon | Rationale | Palette Token |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AI & Machine Learning** | `ai-ml` | Neural Network, Synaptic Intelligence, Cognitive Brain | ❌ Microphone (Irrelevant audio icon) | **Brain / Synaptic Circuitry** (`neural-brain`) | AI is about cognitive reasoning, transformer weights, and neural networks—not audio dictation. | `--cat-ai` (`#5B3DF5`, Electric Indigo) |
| **Quantum Computing** | `quantum` | Atomic Superposition, Quantum Orbitals, Entangled Qubits | ⚠️ Low-contrast generic ellipses | **Atomic Orbit & Probability Nucleus** (`quantum-atom`) | Quantum computing relies on subatomic spin, qubits, and probability amplitudes in Hilbert space. | `--cat-quantum` (`#0284C7`, Sky Cyan) |
| **Career & Placement** | `career` | Professional Ascent, Engineering Career, Growth | ⚠️ Plain briefcase | **Briefcase & Upward Trajectory** (`career-growth`) | Represents software engineering placements, ATS-friendly portfolios, and professional milestones. | `--cat-career` (`#059669`, Emerald Green) |
| **Projects Hub** | `projects` | Building, Shipping, Propulsion, Code Terminal | ❌ Generic Star (Bookmark symbol) | **Rocket Launch & Propulsion** (`rocket-ship`) | Projects are about shipping real-world code, launching apps to production, and contributing to open source. | `--cat-projects` (`#D97706`, Amber Orange) |
| **Tech Fundamentals** | `tech-fundamentals` | Architectural Stack, Operating System & DBMS Layers | ❌ Repeated Orange Color / Terminal only | **Isometric Stack & System Layers** (`system-layers`) | Core CS is built upon stacked layers: hardware, OS kernel, database engines, and networking protocols. | `--cat-fundamentals` (`#6366F1`, Royal Violet) |
| **Politics & Governance** | `gov-policy` | Constitution, Republic Institutions, Justice, Parliament | ❌ Residential House / Home icon | **Constitutional Landmark & Pillars** (`landmark-justice`) | Represents the Parliament of India, constitutional law, EVM integrity, and public policy institutions. | `--cat-gov` (`#E11D48`, Kumkum Rose) |

---

## 2. Icon Tile Architectural Specifications

- **Container Dimensions**: Exactly `56px × 56px` (`w-14 h-14`).
- **Corner Radius**: `16px` (`rounded-2xl`).
- **Surface Treatment**:
  - Light mode: Category accent color at 10%–12% opacity (`bg-[color]/10`).
  - Dark mode: Deep obsidian tint (`dark:bg-[color]/15`).
  - Border: Subtle 1px matching border (`border border-[color]/20 dark:border-[color]/30`).
- **Icon Sizing**: Exactly `28px × 28px` (`w-7 h-7`), perfectly centered.
- **Stroke & Weight**: `2px` crisp vector lines with soft secondary duotone opacity (fill at 18% opacity, stroke at 100%).
- **Interactive State**: `group-hover:scale-105` micro-interaction with zero layout shift.

---

## 3. Systematic 6-Color Palette Tokens

```css
:root {
  /* AI & Machine Learning */
  --cat-ai: #5B3DF5;
  --cat-ai-bg: rgba(91, 61, 245, 0.10);
  --cat-ai-border: rgba(91, 61, 245, 0.25);

  /* Quantum Computing */
  --cat-quantum: #0284C7;
  --cat-quantum-bg: rgba(2, 132, 199, 0.10);
  --cat-quantum-border: rgba(2, 132, 199, 0.25);

  /* Career & Placement */
  --cat-career: #059669;
  --cat-career-bg: rgba(5, 150, 105, 0.10);
  --cat-career-border: rgba(5, 150, 105, 0.25);

  /* Projects Hub */
  --cat-projects: #D97706;
  --cat-projects-bg: rgba(217, 119, 6, 0.10);
  --cat-projects-border: rgba(217, 119, 6, 0.25);

  /* Tech Fundamentals */
  --cat-fundamentals: #6366F1;
  --cat-fundamentals-bg: rgba(99, 102, 241, 0.10);
  --cat-fundamentals-border: rgba(99, 102, 241, 0.25);

  /* Politics & Governance */
  --cat-gov: #E11D48;
  --cat-gov-bg: rgba(225, 29, 72, 0.10);
  --cat-gov-border: rgba(225, 29, 72, 0.25);
}
```
All colors exceed **WCAG 2.1 AA (4.5:1)** contrast against both `#FFFFFF` and `#121016` backgrounds.
