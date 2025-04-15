---
title: 2025.03 Progress Report
description: In March, eweOS enhanced its system with new kernel features, comprehensive package updates across the board, valuable upstream contributions, and expanded infrastructure support
date: 2025-03-31
---

> In March, eweOS enhanced its system with new kernel features, comprehensive package updates across the board, valuable upstream contributions, and expanded infrastructure support

## Package Highlights

> 247 PRs merged in total during Mar 2025.
> 76.5% (189) of them are [automated](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-03-01..2025-03-31+label%3Aautomated)
>
> See a full list [here](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-03-01..2025-03-31+).
>
> There are 1237 packages on eweOS in total
> - 1228 (99.2%) are available on aarch64
> - 1212 (97.9%) are available on riscv64
> - 1194 (96.5%) are available on loongarch64

### Kernel

- linux [6.13.8](https://github.com/eweOS/packages/pull/3537) [with bpf enabled](https://github.com/eweOS/packages/pull/3455)
- linux-lts [6.12.18](https://github.com/eweOS/packages/pull/3368)
- bridge driver is now [enabled by default](https://github.com/eweOS/kernel-config/commit/6ce1fee2f44d079058d97b43e4ca9db3605b5aa8)
- simpledrm driver is now [enabled by default](https://github.com/eweOS/kernel-config/commit/16ebb3196a62804c351ce3dc25b09df7a98bd716)

### Toolchain / Programming Languages

- OpenJDK [23.0.2.u7](https://github.com/eweOS/packages/pull/3550)
- pahole [1.29.0](https://github.com/eweOS/packages/pull/3454) (New)
- vala [0.56.18](https://github.com/eweOS/packages/pull/3361)
- mold [2.37.1](https://github.com/eweOS/packages/pull/3338)
- Go [1.24.1](https://github.com/eweOS/packages/pull/3318)

### Utils

- qemu [9.2.3](https://github.com/eweOS/packages/pull/3551)
- qemu-user-static binaries are now available on loongarch64
- emacs [30.1](https://github.com/eweOS/packages/pull/3301)
- ostree [2025.2](https://github.com/eweOS/packages/pull/3544)
- xz [5.8.0](https://github.com/eweOS/packages/pull/3540)
- minicom [2.10](https://github.com/eweOS/packages/pull/3478)
- util-linux [2.41](https://github.com/eweOS/packages/pull/3482)
- git [2.49.0](https://github.com/eweOS/packages/pull/3450)
- android-tools [35.0.2](https://github.com/eweOS/packages/pull/3412)
- typst [0.13.1](https://github.com/eweOS/packages/pull/3356)

### Libraries

- mesa [25.0.2](https://github.com/eweOS/packages/pull/3498)
- protobuf [30.1](https://github.com/eweOS/packages/pull/3450)
- gstreamer [1.26.0](https://github.com/eweOS/packages/pull/3443)
- libusb [1.0.28](https://github.com/eweOS/packages/pull/3536)
- abseil-cpp [20250127](https://github.com/eweOS/packages/pull/3530)
- libarchive [3.7.8](https://github.com/eweOS/packages/pull/3505)
- protobuf [30.1](https://github.com/eweOS/packages/pull/3450)
- svt-av1 [3.0.1](https://github.com/eweOS/packages/pull/3428)

### Desktop

- gimp [3.0.0](https://github.com/eweOS/packages/pull/3441) (New)
- gtk4 [4.18.3](https://github.com/eweOS/packages/pull/3560)
- mpv [0.40.0](https://github.com/eweOS/packages/pull/3547)
- firefox [136.0.2](https://github.com/eweOS/packages/pull/3531)
- pipewire [1.4.1](https://github.com/eweOS/packages/pull/3491)


### System Management

- limine [9.2.1](https://github.com/eweOS/packages/pull/3539)
- bluez [5.80.0](https://github.com/eweOS/packages/pull/3549)
- Dropbear [2025.87.1](https://github.com/eweOS/packages/pull/3316)
- dbus [1.16.2](https://github.com/eweOS/packages/pull/3309)

### More

- ...and more!

## Upstream Contribution

- QEMU: [Clang compatibility fixes on loongarch64](https://lore.kernel.org/qemu-devel/20250314033150.53268-3-ziyao@disroot.org/)
- bluez: [Fix unreasonable pointer assignment](https://lore.kernel.org/all/20250325083546.31597-2-ziyao@disroot.org/)
- minicom: [Correctly clean up and print a message when failing to open the device](https://salsa.debian.org/minicom-team/minicom/-/merge_requests/24)

## Workflow

- Package info collecting is [now based on database](https://github.com/eweOS/workflow/commit/9b309f2f0d26dd70fbc43ee59dec6da3517b0419)

## Infra

- A new official mirror is deplyed at [Las Vegas](https://os-repo-us-las.ewe.moe), United States.
- `robots.txt` is now deployed at all repositories to prevent massive traffic consuming from crawlers.

## Community

- eweOS is expected to participate in the [OSPP 2025](https://summer-ospp.ac.cn/) program. Project details will be released next month.

## Incident

- Due to a maintenance issue, EU repository server was unable to renew, causing it to be taken offline. (Fixed)

## Regular Meeting

<details>
  <summary>1st Half</summary>

## Regular Meeting for 2025.03 1st Half

### Attendee

- @YukariChiba, eweOS developer
- @ziyao233, eweOS developer
- @hack3ric, eweOS developer

### Agenda

- Applying for OSPP 2025

</details>
