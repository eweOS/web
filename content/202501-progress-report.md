---
title: 2025.01 Progress Report
description: In January, eweOS expanded its capabilities through significant kernel configuration changes, numerous package upgrades across all categories, and advancements in community engagement and tooling.
date: 2025-01-31
---

> In January, eweOS expanded its capabilities through significant kernel configuration changes, numerous package upgrades across all categories, and advancements in community engagement and tooling.

## Package Highlights

> 177 PRs merged in total during Jan 2025. 
> 74% (131) of them are [automated](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-01-01..2025-01-31+label%3Aautomated)
> See a full list [here](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-01-01..2025-01-31+).

> There are 1579 packages on eweOS in total
> - 1573 (99.6%) are available on aarch64
> - 1542 (97.6%) are available on riscv64
> - 1464 (92.7%) are available on loongarch64

### Kernel

- [device mapper is enabled](https://github.com/eweOS/kernel-config/commit/85666d57a7e4cb2b1a1b727e990b131eb5f9a3fa) in kernel config
- [crypto functions are added](https://github.com/eweOS/kernel-config/commit/b2d2677af91ce4ea555cb377c1ffc0a8c9ed3272) in kernel config and acceleration is enabled for x86_64
- thermal and power drivers are [enabled](https://github.com/eweOS/kernel-config/commit/a4c57c3b40456dd786907bfa3df4b11eab651ed3) in kernel config
- linux [6.12.9](https://github.com/eweOS/packages/commit/d4bb3969cdb646c511d6bf8b9c0a4627c16f5da7)
- linux-lts [6.6.71](https://github.com/eweOS/packages/commit/e3aa2405fd90b9b37aa57b3be125382165645fbf)
- linux-firmware [20250109](https://github.com/eweOS/packages/pull/2986)

### Toolchain / Programming Languages

- mold [2.36.0](https://github.com/eweOS/packages/pull/2929)
- CMake [3.31.4](https://github.com/eweOS/packages/pull/2975)
- Go [1.23.5](https://github.com/eweOS/packages/pull/3017)
- capstone [5.0.5](https://github.com/eweOS/packages/pull/2989)
- cbindgen [0.28.0](https://github.com/eweOS/packages/pull/2988)
- alex [3.5.2.0](https://github.com/eweOS/packages/pull/2890)

### Utils

- cryptsetup [2.7.5](https://github.com/eweOS/packages/pull/2831) (New)
- tinyramfs [now supports LUKS](https://github.com/eweOS/packages/pull/3012)
- micro [2.0.14](https://github.com/eweOS/packages/pull/2985) (New)
- git [2.48.1](https://github.com/eweOS/packages/pull/2970)
- ctags [6.1.20250112.0](https://github.com/eweOS/packages/pull/2971)
- util-linux [2.40.4](https://github.com/eweOS/packages/pull/2951)
- parallel [20241222](https://github.com/eweOS/packages/pull/2987) (New)

### Libraries

- vulkan 1.4.304
- rsync [3.4.1](https://github.com/eweOS/packages/pull/3007)
- [pango](https://github.com/eweOS/packages/pull/2939)
- sqlite [3.48.0](https://github.com/eweOS/packages/pull/2973)
- libgpiod [2.2](https://github.com/eweOS/packages/pull/2915) (New)
- protobuf [29.3](https://github.com/eweOS/packages/pull/2900)

### Desktop

- Firefox [134.0.1](https://github.com/eweOS/packages/pull/2927)
- flatpak [1.16.0](https://github.com/eweOS/packages/pull/2921)

### Networking

- ethtool [6.11](https://github.com/eweOS/packages/pull/2982)
- caddy [2.9.1](https://github.com/eweOS/packages/pull/2919)
- bird [3.0.1](https://github.com/eweOS/packages/pull/2917)

### Games

- PrismLauncher [9.2](https://github.com/eweOS/packages/pull/2933)

### Misc

- Limine [8.7.0](https://github.com/eweOS/packages/pull/2916) with official support for loongarch64

### More

- ...and more!

## Community

- Ventoy 1.1.00 released [with support for eweOS ISO](https://github.com/ventoy/Ventoy/releases/tag/v1.1.00)

## Infra

- rollmeow [0.3.0](https://github.com/eweOS/rollmeow/releases/tag/v0.3.0) was released with support for batched packages


## Regular Meeting

<details>
  <summary>1st Half</summary>

## Regular Meeting for 2025.01 1st Half

### Location
    
Hanting Hotel at Nanchang West Railway Station, Nanchang, China
    
### Attendee

- @YukariChiba, eweOS developer
- @ziyao233, eweOS developer
- @hack3ric, eweOS developer
- @luoling8192

### Agenda

- schema and management of eweOS User Repo (EUR)
- delivered stickers and decorations
- on-boarding of new contributors and developers
- CURD workflow of packages triggered by issues
    
</details>

## Gallery

![eweOS with LUKS and plymouth prompt](/content-img/202501-progress-report/plymouth-luks.jpg)
- eweOS with LUKS and plymouth prompt

![new stickers delivered at meetup](/content-img/202501-progress-report/stickers.jpg)
- new stickers delivered at meetup

![meetup group photo](/content-img/202501-progress-report/meetup.jpg)
- meetup group photo
