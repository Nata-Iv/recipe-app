import chefIcon from "../assets/chef_icon.png";

export default function Header() {
  return (
    <header className="header">
      <img src={chefIcon} className="logo" alt="logo globe" />
      <h1>Chef Claude</h1>
    </header>
  );
}
