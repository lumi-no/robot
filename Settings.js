
import React from "react";
import SettingsForm from "../components/SettingsForm";

function Settings({ settings, onSave }) {
  return (
    <div className="page">
      <div className="page-heading">
        <h1>⚙️ Налаштування симулятора</h1>
        <p>
          Змініть швидкість руху робота та кількість
          випадкових перешкод.
        </p>
      </div>

      <section className="panel settings-panel">
        <h2>Параметри робота</h2>

        <SettingsForm
          settings={settings}
          onSave={onSave}
        />
      </section>
    </div>
  );
}

export default Settings;
