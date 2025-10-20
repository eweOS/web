---
title: 2025.08 / 2025.09 Progress Report
description: In August and September, eweOS progressed steadily with extensive package upgrades, porting of GHC to RISC-V and adding major new packages like KiCAD. The projects reach also grew with the addition of new community mirrors, fueled by new contributors and consistent upstream contributions.
date: 2025-10-13
---

> In August and September, eweOS progressed steadily with extensive package upgrades, porting of GHC to RISC-V and major new packages like KiCAD. The project's reach also grew with the addition of new community mirrors, fueled by new contributors and consistent upstream contributions.

## Statistics for 2025.08

> 352 PRs merged in total during August 2025. 
> 77.8% (274) of them are [automated](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-08-01..2025-08-31+label%3Aautomated)

> See a full list [here](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-08-01..2025-08-31+).

## Statistics for 2025.09

> 220 PRs merged in total during September 2025. 
> 83% (183) of them are [automated](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-09-01..2025-09-30+label%3Aautomated)

> See a full list [here](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-09-01..2025-09-30+).

> There are 1352 packages on eweOS x86_64 in total
  > - 1346 (99.6%) are available on aarch64
  > - 1332 (98.5%) are available on riscv64
  > - 1320 (97.6%) are available on loongarch64

## Package Highlights

### Kernel

- linux [6.16.7](https://github.com/eweOS/packages/pull/5536)
- linux-lts [6.12.47](https://github.com/eweOS/packages/pull/5537)
- linux-firmware [20250917](https://github.com/eweOS/packages/pull/5507)
- Now [linux-uapi-headers](https://github.com/eweOS/packages/pull/5536) replaces `linux-headers` and `linux-lts-headers`

### Toolchain / Programming Languages

- GHC [9.6.4](https://github.com/eweOS/packages/pull/5014) is now [available on riscv64](https://github.com/eweOS/packages/pull/5193). Thanks [@definfo](https://github.com/definfo)!
- racket [8.17](https://github.com/eweOS/packages/pull/4929) (New)
- chez-scheme [10.2.0](https://github.com/eweOS/packages/pull/4926) (New)
- wasi-related runtime now [built separately from LLVM](https://github.com/eweOS/packages/pull/5220)
- mold [2.40.4](https://github.com/eweOS/packages/pull/5189)
- meson [1.9.0](https://github.com/eweOS/packages/pull/5463)
- cmake [4.1.1](https://github.com/eweOS/packages/pull/5300)
- Python [3.13.7](https://github.com/eweOS/packages/pull/5200)
- Go [1.25.0](https://github.com/eweOS/packages/pull/5171)
- nodejs [24.8.0](https://github.com/eweOS/packages/pull/5465)
- Perl [5.42.0](https://github.com/eweOS/packages/issues/5324)
- slibtool [0.7.4](https://github.com/eweOS/packages/pull/5552)
- cython [3.1.4](https://github.com/eweOS/packages/pull/5514)
- verilator [5.0.40](https://github.com/eweOS/packages/pull/5397)

### Utils

- KiCAD [9.0.4](https://github.com/eweOS/packages/pull/5260) (New)
- glmark2 [2023.01](https://github.com/eweOS/packages/pull/5018) (New)
- nano [8.6](https://github.com/eweOS/packages/pull/5241)
- vim [9.1.1593](https://github.com/eweOS/packages/pull/4935)
- neovim [0.11.4](https://github.com/eweOS/packages/pull/5464)
- emcas [30.2](https://github.com/eweOS/packages/pull/5098)
- wine [10.15](https://github.com/eweOS/packages/pull/5491)
- git [2.51.0](https://github.com/eweOS/packages/pull/5449)
- graphviz [13.2.1](https://github.com/eweOS/packages/pull/5071)
- strace [6.16](https://github.com/eweOS/packages/pull/4934)
- shellcheck [0.11.0](https://github.com/eweOS/packages/pull/4914)

### Libraries

- mimalloc [2.2.4](https://github.com/eweOS/packages/pull/5087)
- zlib-ng [2.2.5](https://github.com/eweOS/packages/pull/4988)
- KDE Framework [6.17.0](https://github.com/eweOS/packages/issues/5120)
- openssl [3.5.2](https://github.com/eweOS/packages/pull/4936)
- glib [2.86.0](https://github.com/eweOS/packages/pull/5486)
- curl [8.16.0](https://github.com/eweOS/packages/pull/5443)
- gpgme [2.0.0](https://github.com/eweOS/packages/pull/5404)
- harfbuzz [11.4.5](https://github.com/eweOS/packages/pull/5315)
- libffi [3.5.2](https://github.com/eweOS/packages/pull/4904)

### Desktop

- Plasma [6.4.4](https://github.com/eweOS/packages/issues/5183)
- labwc [0.9.1](https://github.com/eweOS/packages/pull/5002)
- hyprland [0.51.0](https://github.com/eweOS/packages/pull/5516)
- wayfire [0.10.0](https://github.com/eweOS/packages/pull/5281)
- firefox [142.0.0](https://github.com/eweOS/packages/pull/5275)
- fractal [12](https://github.com/eweOS/packages/pull/5032)
- gtk4 [4.20.1](https://github.com/eweOS/packages/pull/5452)
- wxwidgets [3.2.8](https://github.com/eweOS/packages/pull/5255)
- mesa [25.2.3](https://github.com/eweOS/packages/pull/5520)
- wlroots [0.19.1](https://github.com/eweOS/packages/pull/5551)
- glew [2.2.0](https://github.com/eweOS/packages/pull/5251)

### Multimedia

- intel-media-driver [25.3.3](https://github.com/eweOS/packages/pull/5455)
- gstreamer [1.26.6](https://github.com/eweOS/packages/pull/5490)
- pavucontrol [6.2](https://github.com/eweOS/packages/pull/5527)
- pipewire [1.4.8](https://github.com/eweOS/packages/pull/5466)

### System Management

- modemmanager-qt [6.17.0](https://github.com/eweOS/packages/pull/5250) (New)
- modemmanager [1.24.2](https://github.com/eweOS/packages/pull/5226) (New)
- xfsprogs [6.15.0](https://github.com/eweOS/packages/pull/5262) (New)
- limine [9.6.1](https://github.com/eweOS/packages/pull/5176)
- qemu [10.1.0](https://github.com/eweOS/packages/pull/5284)
- podman [5.6.0](https://github.com/eweOS/packages/pull/5204)
- lxc [6.0.5](https://github.com/eweOS/packages/pull/5124)
- cups [2.4.14](https://github.com/eweOS/packages/pull/5460)
- bluez [5.84](https://github.com/eweOS/packages/pull/5549)
- btrfs-progs [6.16.1](https://github.com/eweOS/packages/pull/5440)

### Network

- ii [2.0](https://github.com/eweOS/packages/pull/5531) (New)
- caddy [1.10.2](https://github.com/eweOS/packages/pull/5299)
- sing-box [1.12.8](https://github.com/eweOS/packages/pull/5494)
- tor [0.4.8.18](https://github.com/eweOS/packages/pull/5493)

### Games

- wesnoth [1.19.14](https://github.com/eweOS/packages/pull/4896) (New)
- luanti [5.13.0](https://github.com/eweOS/packages/pull/4907)

### More

- ...and more!

## Upstream Contribution

- We've caught and helped slibtool upstream to [solve](https://dev.midipix.org/cross/slibtool/c/36cef51f48b4e46a55cc48ba1559f0dc147c09a1?branch=main) compatibility issues when merging LLVM-generated archives
- telegram-desktop: [Fix compatibility for GLib 2.86.0 or later](https://github.com/desktop-app/lib_base/pull/274)
- [A draft PR](https://github.com/openSUSE/obs-build/pull/1101) for using .SRCINFO in Open Build Service is now present to upstream

## Infra

- There are two new eweOS community mirrors available
  - [Harbin Institute of Technology](https://mirrors.hit.edu.cn/#/home)
  - [Communication University of China (FMA)](https://ewemirror.ftrmedia.org/eweos/)

### Workflow

- `bump_ver` workflow now [checks duplication](https://github.com/eweOS/workflow/commit/c357531f86b85c27c0053db39aad50d2b87c700b)
- `check_symdiff` workflow now [checks only libraries ends with `.so`](https://github.com/eweOS/workflow/commit/f3ff8f2049206d2c76b6d33a77dcd6ecc20d5a0e)
- `pr_check` workflow now [won't run `check_symdiff` on `any` packages](https://github.com/eweOS/workflow/commit/30e93154f7f5b61387081b14e4523aaddb8880e2)
- `info_pkgs` workflow now [supports packages with multiple groups](https://github.com/eweOS/workflow/commit/e74747a9aefeb29e5834ff6364f0749805901cd9)
- `check_symdiff` workflow is now [not required](https://github.com/eweOS/workflow/commit/8da23c36a9e801810022851bdc4a58e64c49bab4) for PR approval
- Workflow triggerd by telegram bot now [shows the username of chatter](https://github.com/eweOS/bot/commit/11ce99dcec2a09ec0e0dbda5a5e44af17b9a4494)

### Website

- `groups` fields are [now shown](https://github.com/eweOS/web/commit/65b9fbef480cd2e0713c1a0e659b46655aa96d3f) at package info page

### Repo

Current size of repositories:

```
75G     .

63G     ./eweos
61G     ./eweos/main
16G     ./eweos/main/os/x86_64
16G     ./eweos/main/os/aarch64
16G     ./eweos/main/os/riscv64
15G     ./eweos/main/os/loongarch64
2.4G    ./eweos/testing
1.2G    ./eweos/testing/os/x86_64
991M    ./eweos/testing/os/aarch64
220M    ./eweos/testing/os/riscv64
108K    ./eweos/testing/os/loongarch64

6.0G    ./eweos-images
```

## Community

- Thanks [definfo](https://github.com/definfo) for backporting riscv64 NCG support to GHC 9.6.7 as the task of OSPP.
- Thanks [白日梦主义](https://github.com/Cherrling/) and [Avrova Donz](https://github.com/yangdongstation) for mirroring eweOS repository!
- There are three new contributors during this period,
  - [definfo](https://github.com/eweOS/packages/pull/5219)
  - [aisuneko](https://github.com/eweOS/packages/pull/5278)
  - [rmolive](https://github.com/eweOS/packages/pull/4926)
  - Welcome!

### Gallery

![image](https://hackmd.io/_uploads/H13rp_9pxe.png)

- experimental KDE environment on eweOS (by YUkariChiba)

![image](https://hackmd.io/_uploads/rJx-Tucplx.png)

- GHCi running on eweOS riscv64 (by Yao Zi)

## Regular Meeting

> No regular meeting at August or September.
