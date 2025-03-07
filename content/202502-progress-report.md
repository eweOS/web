---
title: 2025.02 Progress Report
description: In February, eweOS continued its progress with kernel updates, extensive package upgrades, important library fixes, and enhancements to its build infrastructure and website.
date: 2025-02-28
---

> In February, eweOS continued its progress with kernel updates, extensive package upgrades, important library fixes, and enhancements to its build infrastructure and website.

## Package Highlights

> 199 PRs merged in total during Feb 2025.
> 79.3% (158) of them are [automated](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-02-01..2025-02-28+label%3Aautomated)

> See a full list [here](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-02-01..2025-02-28+).

> There are 1228 packages on eweOS in total
> 1220 (99.3%) are available on aarch64
> 1204 (98.0%) are available on riscv64
> 1183 (96.3%) are available on loongarch64

### Kernel

- linux [6.13.4](https://github.com/eweOS/packages/pull/3233) with input evdev and RNDIS Host enabled
- linux-lts [6.12.12](https://github.com/eweOS/packages/pull/3104)

### Toolchain / Programming Languages

- cmake [3.31.6](https://github.com/eweOS/packages/pull/3264)
- rust [1.85.0](https://github.com/eweOS/packages/pull/3253)
- meson [1.7.0](https://github.com/eweOS/packages/pull/3158)
- python [3.13.2](https://github.com/eweOS/packages/pull/3152)
- LLVM [19.1.7](https://github.com/eweOS/packages/pull/3072)
- perl [5.40.1](https://github.com/eweOS/packages/pull/3059)

### Utils

- emacs [29.4](https://github.com/eweOS/packages/pull/3004) (New)
- verilator [5.034](https://github.com/eweOS/packages/pull/3262)
- busybox with [SHA-256 hardware acceleration available on AArch64](https://github.com/eweOS/packages/pull/3249)
- mercurial [6.9.2](https://github.com/eweOS/packages/pull/3234)
- gtkwave [3.3.121](https://github.com/eweOS/packages/pull/3232) (New)
- mutt [2.2.14](https://github.com/eweOS/packages/pull/3228)
- neovim [0.10.4](https://github.com/eweOS/packages/pull/3159)

### Libraries

- musl [CVE-2025-26519 fix](https://github.com/eweOS/packages/pull/3146)
- SDL3 migration
  - sdl3 [3.2.4](https://github.com/eweOS/packages/pull/3142)
  - sdl2-compat [2.32.50](https://github.com/eweOS/packages/pull/3144)
- GLib [2.82.5](https://github.com/eweOS/packages/pull/3230)
- libclc [19.1.7](https://github.com/eweOS/packages/pull/3226)
- harfbuzz [10.3.0](https://github.com/eweOS/packages/pull/3222)
- pango [1.56.1](https://github.com/eweOS/packages/pull/3082)
- wayland-protocols [1.41](https://github.com/eweOS/packages/pull/3195)
- lcms [2.17](https://github.com/eweOS/packages/pull/3188)
- zlib-ng [2.2.4](https://github.com/eweOS/packages/pull/3166)
- openh264 [2.6.0](https://github.com/eweOS/packages/pull/3155) with security fixes
- libffi now [passes all tests on riscv64](https://github.com/eweOS/packages/pull/3101)
  - With the fix, python-gobject has been available on riscv64

### Desktop

- mesa [24.3.4](https://github.com/eweOS/packages/pull/3081)
- telegram-desktop [5.11.1](https://github.com/eweOS/packages/pull/3268)
- firefox [135.0.1](https://github.com/eweOS/packages/pull/3250)
- fcitx [5.1.12](https://github.com/eweOS/packages/pull/3074)
- niri [25.02](https://github.com/eweOS/packages/pull/3247)
- wine [10.2](https://github.com/eweOS/packages/pull/3242)
- xdg-desktop-portal [1.20.0](https://github.com/eweOS/packages/pull/3212)
- wireplumber [0.5.8](https://github.com/eweOS/packages/pull/3109)
- Sway [1.10.1](https://github.com/eweOS/packages/pull/3063)
- foot [1.20.2](https://github.com/eweOS/packages/pull/3049)
- featherpad [1.6.0](https://github.com/eweOS/packages/pull/3044)

### Networking

- openssl [3.4.1](https://github.com/eweOS/packages/pull/3122)
- curl [8.12.1](https://github.com/eweOS/packages/pull/3149)
- Nginx [1.27.4](https://github.com/eweOS/packages/pull/3124)
- Putty [0.83](https://github.com/eweOS/packages/pull/3123)

### Games

- luanti (Previous Minetest) [5.11.0](https://github.com/eweOS/packages/pull/3204)

### System Management

- Limine [9.0.1](https://github.com/eweOS/packages/pull/3256)
- NetworkManager [1.50.2](https://github.com/eweOS/packages/pull/3192)
- btrfs-progs [6.13](https://github.com/eweOS/packages/pull/3184)
- QEMU [9.2.1](https://github.com/eweOS/packages/pull/3138)

### More

- ...and more!

## Upstream Contribution

- Fcitx5: fixes for building in Wayland-only environments [PR](https://github.com/fcitx/fcitx5/pull/1259)

## Workflow

- CI workflow for `aarch64` now [runs on GitHub ARM runners](https://github.com/eweOS/workflow/commit/7c5a79986a608e12c89340f4bd7303ccbbf1f06b)
- GitHub App now replaces the webhook for task scheduling
- Database files are now [directly used for pkginfo generation](https://github.com/eweOS/workflow/commit/ce6f0bfdfdce02fc946035a87f60c38dec5801c6)
- File lists for packages are now [collected periodically](https://github.com/eweOS/workflow/commit/9b309f2f0d26dd70fbc43ee59dec6da3517b0419)

## Website

- Package info page now [contains file list](https://github.com/eweOS/web/commit/671fb8ddd0f7c282c4767cf950a6be402f4d7647)

## Gallery

![Old galgame running through wine on Wayland](/content-img/202502-progress-report/galgame.jpg)

- Old galgame running through wine on Wayland

## Regular Meeting

No regular meeting at this month!
