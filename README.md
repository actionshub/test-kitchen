# testkitchen

[![CI State](https://github.com/actionshub/testkitchen/workflows/release/badge.svg)](https://github.com/actionshub/kitchen-dokken)

A Github Action to run Test Kitchen on your cookbooks

Note you will need to accept the Chef license, you can find more information at <https://docs.chef.io/chef_license.html>

## Usage

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
      uses: actions/checkout@master
    - name: Install Chef
      uses: actionshub/chef-install@master
    - name: Test-Kitchen
      uses: actionshub/testkitchen@master
      env:
        suite: ${{ matrix.suite }}
        os: ${{ matrix.os }}
        CHEF_LICENSE: accept-no-persist
        KITCHEN_LOCAL_YAML: kitchen.dokken.yml
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
