---
title: 2025.04 / 2025.05 Progress Report
description: In April and May, eweOS advanced significantly with kernel refinements including local versioning, extensive package upgrades featuring new containerization tools and major desktop environment updates, continued impactful upstream contributions, and the milestone promotion of LoongArch64 to tier-1 status.
date: 2025-05-30
---

> In April and May, eweOS advanced significantly with kernel refinements including local versioning, extensive package upgrades featuring new containerization tools and major desktop environment updates, continued impactful upstream contributions, and the milestone promotion of LoongArch64 to tier-1 status.

## Package Highlights for 2025.04

> 267 PRs merged in total during Apr 2025.
> 73% (195) of them are [automated](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-04-01..2025-04-30+label%3Aautomated)
>
> See a full list [here](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-04-01..2025-04-30+).
>
> There are 1259 packages on eweOS in total
> - 1251 (99.3%) are available on aarch64
> - 1237 (98.2%) are available on riscv64
> - 1228 (97.5%) are available on loongarch64

## Package Highlights for 2025.05

> 322 PRs merged in total during May 2025.
> 71.7% (231) of them are [automated](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-05-01..2025-05-30+label%3Aautomated)
>
> See a full list [here](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-05-01..2025-05-30+).
>
> There are 1275 packages on eweOS in total
> - 1265 (99.2%) are available on aarch64
> - 1250 (98.0%) are available on riscv64
> - 1228 (97.4%) are available on loongarch64

### Kernel

- linux-tools [6.14.6](https://github.com/eweOS/packages/pull/4037) (New)
- linux [6.14.8](https://github.com/eweOS/packages/pull/4197)
- linux-firmware [20250519](https://github.com/eweOS/packages/pull/3988)
- eweOS kernels are now shipped with [a local version](https://github.com/eweOS/packages/pull/3996)

### Toolchain / Programming Languages

- LLVM [20.1.5](https://github.com/eweOS/packages/pull/4208)
- Rust [1.87.0](https://github.com/eweOS/packages/pull/4193)
- mold [2.39.1](https://github.com/eweOS/packages/pull/4018)
- Go [1.24.3](https://github.com/eweOS/packages/pull/3897)
- CMake [4.0.2](https://github.com/eweOS/packages/pull/3983)
- Meson [1.8.0](https://github.com/eweOS/packages/pull/3865)
- Perl [5.40.2](https://github.com/eweOS/packages/pull/3693)
- Grass [0.13.4](https://github.com/eweOS/packages/pull/3657) (New)

### Utils

- pawprint:
    - cleanup and fixes for known bugs
    - `z` type is now supported
- ripgrep [14.1.1](https://github.com/eweOS/packages/pull/4038)
- valgrind [3.25.0](https://github.com/eweOS/packages/pull/4035) with riscv64 build enabled
- neovim [0.11.1](https://github.com/eweOS/packages/pull/3867)
- nano [8.4](https://github.com/eweOS/packages/pull/3623)
- strace [6.14](https://github.com/eweOS/packages/pull/3604)
- gtkwave [3.3.124](https://github.com/eweOS/packages/pull/3987)
- verilator [5.0.36](https://github.com/eweOS/packages/pull/3885)

### Libraries

- mesa [25.1.1-2](https://github.com/eweOS/packages/pull/4225)
    - Fix radeonsi crashes
    - opencl-rusticl is added
    - dzn (only in x86_64) and gfxstream vulkan driver are added
- libxml2 [2.14.3](https://github.com/eweOS/packages/pull/4144).
  - It has been [removed from the dependency graph of eweOS' base and base-devel now](https://github.com/eweOS/packages/issues/3939)
- curl [8.14.0](https://github.com/eweOS/packages/pull/4233)
- libarchive [3.8.0](https://github.com/eweOS/packages/pull/4203)
- glib [2.84.2](https://github.com/eweOS/packages/pull/4186)
- openssl [3.5.0](https://github.com/eweOS/packages/pull/3694)
- xz [5.8.1](https://github.com/eweOS/packages/pull/3604)
- icu [77.1](https://github.com/eweOS/packages/pull/3569)

### Desktop

- Firefox [139.0.1](https://github.com/eweOS/packages/pull/4236)
- zed [0.186.7](https://github.com/eweOS/packages/pull/4093) (New)
- LXQt 2.2.0
- Qt 6.9.0
- KDE Framework 6.14.0
- KDE Apps 6.3.5
- labwc [0.8.4](https://github.com/eweOS/packages/pull/3904)
- hyprland [0.49.0](https://github.com/eweOS/packages/pull/4033)
- Wine [10.8](https://github.com/eweOS/packages/pull/4140)
- gtk4 [4.18.5](https://github.com/eweOS/packages/pull/3896)
- weston [14.0.2](https://github.com/eweOS/packages/pull/3871)
- wayland-protocols [1.44](https://github.com/eweOS/packages/pull/3870)
- foot [1.22.1](https://github.com/eweOS/packages/pull/3853)

### Multimedia

- GStreamer [1.26.2](https://github.com/eweOS/packages/pull/4229)
- libaom [3.12.1](https://github.com/eweOS/packages/pull/3822)
- intel-media-driver [25.2.1](https://github.com/eweOS/packages/pull/3816)
- mpd [0.24.3](https://github.com/eweOS/packages/pull/3811)
- libvpx [1.15.1](https://github.com/eweOS/packages/pull/3763)
- pipewire [0.4.2](https://github.com/eweOS/packages/pull/3697)

### System Management

- CRun [1.21](https://github.com/eweOS/packages/pull/4092) (New)
- podman [5.4.2](https://github.com/eweOS/packages/pull/4008) (New)
- Limine [9.3.2](https://github.com/eweOS/packages/pull/4199)
- dinit [0.19.4](https://github.com/eweOS/packages/pull/4010)
- qemu [10.0.0](https://github.com/eweOS/packages/pull/3802)
- dropbear [2025.88](https://github.com/eweOS/packages/pull/3984)
- BlueZ [5.82](https://github.com/eweOS/packages/pull/3618)
- smartmontools [7.5](https://github.com/eweOS/packages/pull/3888)
- connman [1.44](https://github.com/eweOS/packages/pull/3605)

### Network

- Nginx [1.28.0](https://github.com/eweOS/packages/pull/3976)
- Caddy [2.10.0](https://github.com/eweOS/packages/pull/3749)
- Bird [3.1.0](https://github.com/eweOS/packages/pull/3670)
- sing-box [1.11.11](https://github.com/eweOS/packages/pull/4192)

### More

- ...and more!

## Upstream Contribution

- mold: [Relax references to promotable weak undef symbols](https://github.com/rui314/mold/pull/1453)
- golang: [Fix internal linker errors on RISC-V when linking Clang-produced object files](https://github.com/golang/go/pull/73592)
- python-calver: [Unset SOURCE_DATE_EPOCH before running testsuite](https://github.com/di/calver/pull/24)
- pdm-backend: [Fix test failures when Git config core.abbrev is set](https://github.com/pdm-project/pdm-backend/pull/286)
- python-maturin: [Correctly restrict target when resolving dependencies](https://github.com/PyO3/maturin/pull/2562)

## Infra

- loongarch64 port has been promoted to tier-1

## Community

- eweOS [takes part in OSPP 2025](https://summer-ospp.ac.cn/org/orgdetail/74bfef73-c313-4d12-81b3-c5a82dcaff81?lang=zh)
- [A guideline for writing pkgdesc](https://github.com/eweOS/packages/issues/4036) has been proposed
- April Fool [blog post](https://os.ewe.moe/blog/202504-april-fool)

### Gallery

![eweOS running on Loongson 3A5000 laptop](/content-img/202505-progress-report/3a5000.jpg)

- eweOS running on Loongson 3A5000 laptop

## Regular Meeting

> No regular meeting at April or May.
