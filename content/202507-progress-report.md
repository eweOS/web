---
title: 2025.06 / 2025.07 Progress Report
description: In June and July, eweOS expanded its core with new kernel features and upgraded toolchains, while bringing Firefox to LoongArch64. This progress was complemented by broad desktop updates, strong upstream contributions, and a successful developer meetup.
date: 2025-07-31
---

> In June and July, eweOS expanded its core with new kernel features and upgraded toolchains, while bringing Firefox to LoongArch64. This progress was complemented by broad desktop updates, strong upstream contributions, and a successful developer meetup.

## Statistics for 2025.06

> 375 PRs merged in total during June 2025.
> 69% (259) of them are [automated](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-06-01..2025-06-30+label%3Aautomated)

> See a full list [here](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-06-01..2025-06-30+).

## Statistics for 2025.07

> 158 PRs merged in total during July 2025.
> 77% (123) of them are [automated](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-07-01..2025-07-31+label%3Aautomated)

> See a full list [here](https://github.com/eweOS/packages/pulls?q=is:pr+merged:2025-07-01..2025-07-31+).

> There are 1306 packages on eweOS in total
> - 1300 (99.5%) are available on aarch64
> - 1280 (98.0%) are available on riscv64
> - 1276 (97.7%) are available on loongarch64

## Package Highlights

### Kernel

- Traffic schedulers (with support for BPF) are now [enable](https://github.com/eweOS/kernel-config/commit/dd26670d4f47b0e5c65a682b3c896e07ef2461e7)
- XFS is now [enabled](https://github.com/eweOS/kernel-config/commit/baabc57b80f86eb3e1df6f09550b905dafb50f80)
- USB Net and RNDIS are now [enabled](https://github.com/eweOS/kernel-config/commit/08c8d81d6bdc5f280ef7804ed4907f38f23f22f1) to provide support for network sharing from mobile phones
- IPv6 mroute is now [enabled](https://github.com/eweOS/kernel-config/commit/6bb5b8ade8363848cd3c904cfbf0dd771e2b4890) for IPv6 iprule support
- linux [6.15.8](https://github.com/eweOS/packages/pull/4857)
- linux-lts [6.12.35](https://github.com/eweOS/packages/pull/4672)
- linux-firmware [20250708](https://github.com/eweOS/packages/pull/4745)
- sof-bin [2025.05](https://github.com/eweOS/packages/pull/4686)

### Toolchain / Programming Languages

- The Yosys Open Synthesis Toolchain, supporting synthesis and routing for ECP5 FPGA (new)
  - yosys [0.54](https://github.com/eweOS/packages/pull/4681) (new)
  - yosys-abc [0.54](https://github.com/eweOS/packages/pull/4684) (new)
  - nextpnr [0.8](https://github.com/eweOS/packages/pull/4683) (new)
  - prjtrellis [1.4](https://github.com/eweOS/packages/pull/4682) (new)
- llvm [20.1.8](https://github.com/eweOS/packages/pull/4803) with [clang-tools and clang-tools-extra enabled](https://github.com/eweOS/packages/pull/4416)
- mold [2.40.3](https://github.com/eweOS/packages/pull/4886)
- Rust [1.88.0](https://github.com/eweOS/packages/pull/4769)
- automake [1.18.1](https://github.com/eweOS/packages/pull/4828)
- slibtool [0.7.3](https://github.com/eweOS/packages/pull/4712)
- meson [1.8.2](https://github.com/eweOS/packages/pull/4389)
- ninja [1.13.1](https://github.com/eweOS/packages/pull/4799)
- cmake [4.0.3](https://github.com/eweOS/packages/pull/4387)
- nodejs [24.4.1](https://github.com/eweOS/packages/pull/4800)
- rust-bindgen [0.72.0](https://github.com/eweOS/packages/pull/4775)
- rust-analyzer [2025.06.09](https://github.com/eweOS/packages/pull/4400)
- Lua [5.4.8](https://github.com/eweOS/packages/pull/4741)
- Python [3.13.5](https://github.com/eweOS/packages/pull/4534) with now [vendored pip disabled](https://github.com/eweOS/packages/pull/4747)

### Utils

- blesh [0.4.0devel4r2277.14f98dd8](https://github.com/eweOS/packages/pull/4418) (New)
- openfpgaloader [0.13.1](https://github.com/eweOS/packages/pull/4679) (New)
- gawk [5.3.2](https://github.com/eweOS/packages/pull/4417) (New)
- zed [0.191.6](https://github.com/eweOS/packages/pull/4428)
- nano [8.5](https://github.com/eweOS/packages/pull/4392)
- neovim [0.11.3](https://github.com/eweOS/packages/pull/4797)
- vim [9.1.1420](https://github.com/eweOS/packages/pull/4242)
- strace [6.15](https://github.com/eweOS/packages/pull/4271)
- valgrind [3.25.1](https://github.com/eweOS/packages/pull/4263)
- git [2.50.1](https://github.com/eweOS/packages/pull/4743)
- util-linux [2.41.1](https://github.com/eweOS/packages/pull/4569)
- squashfs-tools [4.7](https://github.com/eweOS/packages/pull/4371)
- graphviz [13.1.1](https://github.com/eweOS/packages/pull/4877)
- flashrom [1.6.0](https://github.com/eweOS/packages/pull/4875)
- qemu [10.0.3](https://github.com/eweOS/packages/pull/4846)
- wine [10.12](https://github.com/eweOS/packages/pull/4802)
- jq [1.8.1](https://github.com/eweOS/packages/pull/4770)
- verilator [5.038](https://github.com/eweOS/packages/pull/4762)
- avrdude [8.1](https://github.com/eweOS/packages/pull/4536)

### Libraries

- mesa [25.1.7](https://github.com/eweOS/packages/pull/4884)
- openssl [3.5.1](https://github.com/eweOS/packages/pull/4703)
- glib [2.84.3](https://github.com/eweOS/packages/pull/4393)
- abseil-cpp [20250512.1](https://github.com/eweOS/packages/pull/4464)
- boost [1.88.0](https://github.com/eweOS/packages/pull/4539)
- ncnn [20250503](https://github.com/eweOS/packages/pull/4467)
- curl [8.15.0](https://github.com/eweOS/packages/pull/4777)
- wlroots [0.19.0](https://github.com/eweOS/packages/pull/4380)
- libinput [1.29.0](https://github.com/eweOS/packages/pull/4870)
- sqlite [3.40.3](https://github.com/eweOS/packages/pull/4873)

### Desktop

- Qt6 6.9.1
- KDE Framework 6.15.0
- Plasma 6.4.1
- Firefox [140.0.4](https://github.com/eweOS/packages/pull/4748), now [available on loongarch64](https://github.com/eweOS/packages/pull/4252)
- labwc [0.9.0](https://github.com/eweOS/packages/pull/4834)
- hyprland [0.50.1](https://github.com/eweOS/packages/pull/4832)
- sway [1.11](https://github.com/eweOS/packages/pull/4381)
- fcitx5 [5.1.14](https://github.com/eweOS/packages/pull/4783)
- gtk4 [4.18.6](https://github.com/eweOS/packages/pull/4528)
- wayland [1.24.0](https://github.com/eweOS/packages/pull/4699)
- fractal [11.2](https://github.com/eweOS/packages/pull/4491)
- telegram-desktop [5.15.4](https://github.com/eweOS/packages/pull/4488), now available on loongarch64
- wofi [1.5.1](https://github.com/eweOS/packages/pull/4872)
- wdisplays [1.1.3](https://github.com/eweOS/packages/pull/4866)
- foot [1.23.1](https://github.com/eweOS/packages/pull/4858)
- swayimg [4.5](https://github.com/eweOS/packages/pull/4765)
- font-unifont [16.0.4](https://github.com/eweOS/packages/pull/4481)
- luanti [5.12.0](https://github.com/eweOS/packages/pull/4290)

### Multimedia

- Screencast now works properly (again) with Pipewire [1.4.7-2](https://github.com/eweOS/packages/pull/4856)
- imagemagick [7.1.2.0](https://github.com/eweOS/packages/pull/4813)
- gimp [3.0.4](https://github.com/eweOS/packages/pull/4533)
- gstreamer [1.26.4](https://github.com/eweOS/packages/pull/4773)
- opencv [4.12.0](https://github.com/eweOS/packages/pull/4741)
- MP3 codec is now [available in FFmpeg](https://github.com/eweOS/packages/pull/4692)
- fluidsynth [2.4.7](https://github.com/eweOS/packages/pull/4811)
- libwebp [1.6.0](https://github.com/eweOS/packages/pull/4792)
- intel-media-driver [25.3.0](https://github.com/eweOS/packages/pull/4789)

### System Management

- lxc [6.0.4](https://github.com/eweOS/packages/pull/4386) (New)
- dinit services are [now refactored](https://github.com/eweOS/dinit-services/commit/ce6f93b0e8a8ac8ee1947d84bd1821319b5831eb) with more fs-related early services
- sudo [1.9.17p1](https://github.com/eweOS/packages/pull/4718) with security fixes
- pacman [now handle LTO flags for Rust automatically](https://github.com/eweOS/packages/pull/4419)
- Limine [9.5.1](https://github.com/eweOS/packages/pull/4883)
- NetworkManager [1.52.1](https://github.com/eweOS/packages/pull/4868)
- connman [1.45](https://github.com/eweOS/packages/pull/4874)
- curn [1.22](https://github.com/eweOS/packages/pull/4662)
- cryptsetup [2.4.7](https://github.com/eweOS/packages/pull/4809)
- e2fsprogs [1.47.3](https://github.com/eweOS/packages/pull/4780)
- btrfsprogs [6.15](https://github.com/eweOS/packages/pull/4540)
- lm_sensors [3.6.2](https://github.com/eweOS/packages/pull/4660) (New)

### Network

- bluez [5.83](https://github.com/eweOS/packages/pull/4341)
- bird2 [2.17.1](https://github.com/eweOS/packages/pull/4656) (New)
- bird [3.1.2](https://github.com/eweOS/packages/pull/4348)
- ethtool [6.15](https://github.com/eweOS/packages/pull/4544)
- sing-box [1.11.15](https://github.com/eweOS/packages/pull/4801)

### More

- ...and more!

## Upstream Contribution

- yosys' abc fork: [Respect LDFLAGS when linking](https://github.com/YosysHQ/abc/pull/38)
- podofo: [Fix compatibility with libc++20's from_chars implementation](https://github.com/podofo/podofo/pull/269)
- pytest-asyncio: [Fix tests with pytest 8.4.0 or later](https://github.com/pytest-dev/pytest-asyncio/pull/1141)
- openfpgaloader: [Avoid memcpy() on overlapping regions](https://github.com/trabucayre/openFPGALoader/pull/565)
- yasm: [Fix initialization of a variable](https://github.com/yasm/yasm/pull/289)
- nodejs: [Avoid building maglev IR builder twice when maglev is disabled](https://github.com/nodejs/node/pull/58861)
- valgrind
  - [Fix `-no-pie` detection with newer Clang](https://sourceforge.net/p/valgrind/mailman/message/59184881)
  - [Build int3-amd64 as PIC code](https://sourceforge.net/p/valgrind/mailman/message/59184880)
- Reported the [priority difference](https://github.com/loongson-community/discussions/issues/95) about `-mno-lsx` and `-march` between Clang and GCC
- Reported the [regression with zlib-compressed debuginfo](https://github.com/rui314/mold/issues/1491) since mold 2.40.1
- Pipewire: reported the [configuration-dependent regression about video streaming](https://gitlab.freedesktop.org/pipewire/pipewire/-/issues/4819)

## Infra

- rollmeow [0.4.1](https://github.com/eweOS/rollmeow/releases/tag/v0.4.1) is released
  - Support fetching refs from Git repository
  - Fix memory leaking when fetching a bunch of links

### Workflow

- New automatic `bumpver` PRs will be [submitted as draft by default](https://github.com/eweOS/workflow/commit/28cb1c52c4d9041d93bd9ec855492ea7e82db5a4)
- Depends info can now be [extracted by workflow](https://github.com/eweOS/workflow/commit/bdfe7ac24b2af16f670bcb3480072894db9057c7)
- Workflow dispatcher (also telegram bot) is now [rewritten in TypeScript](https://github.com/eweOS/bot)

### Website

- Dependencies and reverse dependencies [can now be displayed](https://github.com/eweOS/web/commit/ab0e1040a504ed86084797030f5412caba259e04) on package info pages on website
- Download buttons in repositories list [can be displayed](https://github.com/eweOS/web/commit/72cae669153a7c661ef209b70f6bb901861289b9) on smaller sized screens

### Repo

Current size of repositories:

```
61G     .

54G     ./eweos/main
14G     ./eweos/main/os/x86_64
14G     ./eweos/main/os/aarch64
14G     ./eweos/main/os/riscv64
13G     ./eweos/main/os/loongarch64

2.1G    ./eweos/testing
1.1G    ./eweos/testing/os/x86_64
825M    ./eweos/testing/os/aarch64
220M    ./eweos/testing/os/riscv64
76K     ./eweos/testing/os/loongarch64

5.6G    ./eweos-images
```

## Community

- @JulianDroske is now accepted as developer of eweOS.
- @xtexx and @who53 have made their first contributions to eweOS, welcome!

### Gallery

![photo_2025-08-01_03-59-02](/content-img/202507-progress-report/fpga.jpg)

Program a blink demo for ECP5 FPGA on eweOS

![photo_2025-08-01_03-57-04](/content-img/202507-progress-report/profiles.jpg)

Laptop running eweOS and GitHub profiles of eweOS' developers

## Regular Meeting

<details>
  <summary>Special: developers meetup @ RVSC2025</summary>

## Special: developers meetup @ RVSC2025

### Attendee

- @YukariChiba, eweOS developer
- @ziyao233, eweOS developer
- @hack3ric, eweOS developer
- @JulianDroske, eweOS developer

### Agenda

- Distribution of eweOS stickerset
- Users presented problems encountered in using eweOS to developers on site
- Worked together to solve problems and package new packages.
- Explained eweOS to other linux enthusiasts
- Tested status of support for booting eweOS desktop ISO among the riscv64 devices in the field, without success.

</details>
