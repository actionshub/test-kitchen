# test-kitchen

[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](https://opensource.org/licenses/Apache-2.0)

A Github Action to run Test Kitchen on your cookbooks

Note you will need to accept the Chef license, you can find more information at <https://docs.chef.io/chef_license.html>

## Usage

This example shows how to use dokken with this action to test linux servers

```yaml
name: kitchen

on: [pull_request]

jobs:
  dokken:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        os: ['debian-8', 'debian-9', 'centos-7', 'fedora-latest', 'ubuntu-1604', 'ubuntu-1804']
        suite: ['default']
      fail-fast: false
    steps:
    - name: Check out code
      uses: actions/checkout@main
    - name: Install Chef
      uses: actionshub/chef-install@main
    - name: Test-Kitchen
      uses: actionshub/test-kitchen@main
      with:
        suite: ${{ matrix.suite }}
        os: ${{ matrix.os }}
      env:
        CHEF_LICENSE: accept-no-persist
        KITCHEN_LOCAL_YAML: kitchen.dokken.yml
```

This example shows you how to use Macos with this action
This example uses seperate `converge` and `verify` actions

```yaml
name: kitchen
on: [pull_request]
jobs:
  macos:
    needs: [mdl, yamllint, delivery]
    runs-on: macos-latest
    steps:
      - name: Check out code
        uses: actions/checkout@main
      - name: Install Chef
        uses: actionshub/chef-install@main
      - name: Kitchen Converge
        uses: actionshub/test-kitchen@main
        env:
          CHEF_LICENSE: accept-no-persist
          KITCHEN_LOCAL_YAML: kitchen.macos.yml
          TERM: xterm-256color
        with:
          suite: adoptopenjdk-14
          os: macos
          action: converge
      - name: Source Profile for JAVA_HOME
        run: |
          source /etc/profile
          echo "sourced profile for JAVA_HOME"
          echo "New JAVA home after Chef run is: ${JAVA_HOME}"
      - name: Kitchen Verify
        uses: actionshub/test-kitchen@main
        env:
          CHEF_LICENSE: accept-no-persist
          KITCHEN_LOCAL_YAML: kitchen.macos.yml
          TERM: xterm-256color
        with:
          suite: adoptopenjdk-14
          os: macos
          action: verify
```

## Input

We support the following Input Variables

|name| default| description|
|--- |------- |----------- |
|suite|  | the name of the suite to run |
|os |  | Which os to run on |

## Environment Variables

We recommend the following environment variables

|name| default| description|
|--- |------- |----------- |
|CHEF_LICENSE|  | Set to `accept-no-persist` to accept the chef licensing rules |
|KITCHEN_LOCAL_YAML |  | Can be used to megre in another yaml file for test-kitchen, eg `kitchen.dokken.yml` |
