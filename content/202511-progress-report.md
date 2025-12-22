---
title: 2025.10 / 2025.11 Progress Report
description: During October and November, eweOS achieved Hyper-V boot support and demonstrated success on the T-Head TH1520. This period featured extensive updates, including Linux 6.17 and KDE 6.20, plus critical fixes for LoongArch and GTK4. The community welcomed new contributors while maintaining strong package parity across architectures.
date: 2025-12-22
---

> During October and November, eweOS achieved Hyper-V boot support and demonstrated success on the T-Head TH1520. This period featured extensive updates, including Linux 6.17 and KDE 6.20, plus critical fixes for LoongArch and GTK4. The community welcomed new contributors while maintaining strong package parity across architectures.

![eweOS Running on T-Head TH1520](https://hackmd.io/_uploads/rJdmqE8X-e.png)

<center>eweOS Running on T-Head TH1520, by <a href="https://github.com/ziyao233">Yao Zi</a></center>

## New Features

- `linux` and `linux-lts` now [boots on Hyper-V virtual machines](https://github.com/eweOS/kernel-config/pull/22). Thanks pizero (matrix account @pizero:mozilla.org) for testing.
- Vulkan backend is now [available for GTK4](https://github.com/eweOS/packages/pull/5723)
- dav1d's assembly-accelerated routines are [enabled for loongarch64](https://github.com/eweOS/packages/pull/5808)
- `util-linux` now [links to `libutmps`](https://github.com/eweOS/packages/pull/6149) to read/write UTMP database

## New Packages

- 7zip [25.01](https://github.com/eweOS/packages/pull/5605), [replacing the oboslete, inactive package p7zip](https://github.com/eweOS/packages/issues/5581)
- OpenOCD [0.12.0](https://github.com/eweOS/packages/pull/5534), on-chip debugging and programming tool.
- xfel [1.3.3](https://github.com/eweOS/packages/pull/5717), 3rd-party flashing tool for Allwinner SoCs.

## Bug Fixes

- `glmark2-wayland` now correctly [loads `libOpenGL.so`](https://github.com/eweOS/packages/pull/5681) and works.
- Installation path for libkmod is [fixed](https://github.com/eweOS/packages/pull/5750)
- Dependency to `vulkan-icd-loader` is correctly [described for GTK4](https://github.com/eweOS/packages/pull/5833) to avoid unmet ELF symbols
- `mimalloc` now [disables usage of LSE extension on aarch64](https://github.com/eweOS/packages/pull/5840), which isn't mandatory in eweOS aarch64 baseline, ARMv8.0a
- `llvm-config` now [produces correct flags](https://github.com/eweOS/packages/pull/6138) with `--system-libs --link-static`
- Unused runtime dependency to `Python` is [dropped from Ninja](https://github.com/eweOS/packages/pull/6137)
- `busybox` now [doesn't override `/etc/mdev.conf`, `/etc/ntp.conf`, and `/etc/sysctl.conf` on upgrade](https://github.com/eweOS/packages/pull/6153)

## Key Upgrades

- linux [6.17.9](https://github.com/eweOS/packages/pull/6132)
- linux-lts [6.12.58](https://github.com/eweOS/packages/pull/5850)
- linux-firmware [20251111](https://github.com/eweOS/packages/pull/5843)
- dinit [0.20.0](https://github.com/eweOS/packages/pull/5971)
- Go [1.25.4](https://github.com/eweOS/packages/pull/6008)
- NodeJS [25.2.1]()
- Rust [1.91.0](https://github.com/eweOS/packages/pull/5839)
- Mesa [25.3.0](https://github.com/eweOS/packages/pull/5914)
- Firefox [144.0.2](https://github.com/eweOS/packages/pull/5815)
- Qt 6.10.0
- GTK4 [4.20.3](https://github.com/eweOS/packages/pull/6010)
- Hyprland [0.52.1](https://github.com/eweOS/packages/pull/6018)
- LxQT [2.3.0](https://github.com/eweOS/packages/issues/5917)
- labwc [0.9.2](https://github.com/eweOS/packages/pull/5591)
- KDE Framework [6.20.0](https://github.com/eweOS/packages/issues/5506)

## New Contributors

[WeirdGumi](https://github.com/WeirdGumi) submitted the [first PR](https://github.com/eweOS/kernel-config/pull/23) to our kernel-config becomes the new contributor, welcome!

## Upstream Contribution

- [PATCH](https://lore.kernel.org/dwarves/20251130032113.4938-2-ziyao@disroot.org/) to fix BTF generation for LLVM-built RISC-V/PowerPC kernels
- musl compatibility [improvements](https://github.com/aous72/OpenJPH/pull/229) for OpenJPH
- Make glmark2 [try loading `libOpenGL.so`](https://github.com/glmark2/glmark2/pull/255) on EGL platforms

## Code Activity

- [156 pull requests](https://github.com/eweOS/packages/pulls?q=is%3Apr+merged%3A2025-10-01..2025-10-31+) are merged during October, 101 of them (64.7%) are [automated](https://github.com/eweOS/packages/pulls?q=is%3Apr+merged%3A2025-10-01..2025-10-31+label%3Aautomated)
- [353 pull requests](https://github.com/eweOS/packages/pulls?q=is%3Apr+merged%3A2025-11-01..2025-11-30+) are merged during October, 191 of them (54.1%) are [automated](https://github.com/eweOS/packages/pulls?q=is%3Apr+merged%3A2025-11-01..2025-11-30+label%3Aautomated)

## Package Availability across Architectures

- 1362 packages are available on x86_64
- 1356 packages (99.6% compared to x86_64) are available on aarch64
- 1345 packages (98.8%) are available on riscv64
- 1336 packages (98.1%) are available on loongarch64

## Repository

```
77G     .

65G     ./eweos
63G     ./eweos/main
16G     ./eweos/main/os/aarch64
17G     ./eweos/main/os/x86_64
15G     ./eweos/main/os/loongarch64
16G     ./eweos/main/os/riscv64
2.4G    ./eweos/testing
989M    ./eweos/testing/os/aarch64
1.2G    ./eweos/testing/os/x86_64
108K    ./eweos/testing/os/loongarch64
220M    ./eweos/testing/os/riscv64

6.2G    ./eweos-images
```
