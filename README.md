# HRnet CRM

HRnet is an internal web application used by the company "Wealth Health".
It got currently two pages: 
- One for registering an employee thanks to a form.
- The other one display the registered employees in a table where each line shows one employee.

The frontend framework used to develop this project is React. For the state management Redux Toolkit
make a bridge between React and LocalForage.

A components' library is associated to this project, you can find it by following [this link](https://github.com/AEMuto/AntoineMarseaud_14_HRnet_React_Library_23032022).

## How to use

### Installation

I recommend to use [nvm](https://github.com/nvm-sh/nvm) to get the right version of nodejs.

```shell
nvm use 16
```

```shell
git clone https://github.com/AEMuto/AntoineMarseaud_14_HRnet_Application_23032022
```

```shell
cd AntoineMarseaud_14_HRnet_Application_23032022
```

```shell
npm i
```
### Usage

- `nvm run dev` to start the local dev server.

- `nvm run build` to build the project.

- `nvm run preview` to start the local server showing the compiled project.