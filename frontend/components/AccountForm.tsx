"use client";

import { useState } from "react";

type Props = {
  initialData: any;
};

export default function AccountForm({ initialData }: Props) {
  const [form, setForm] = useState({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    email: initialData.email,
    password: "",
    ...initialData.address,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        password: form.password || undefined,
        address: {
          cep: form.cep,
          street: form.street,
          number: form.number,
          complement: form.complement,
          district: form.district,
          city: form.city,
          state: form.state,
        },
      }),
    });

    alert("Dados atualizados com sucesso");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded border"
    >
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nome"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
        />
        <Input
          label="Sobrenome"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
        />
      </div>

      <Input label="E-mail" value={form.email} disabled />
      <Input
        label="Senha de acesso"
        name="password"
        type="password"
        onChange={handleChange}
      />

      <Input label="CEP" name="cep" value={form.cep} onChange={handleChange} />
      <Input label="Endereço" name="street" value={form.street} disabled />
      <Input
        label="Número"
        name="number"
        value={form.number}
        onChange={handleChange}
      />
      <Input
        label="Complemento"
        name="complement"
        value={form.complement}
        onChange={handleChange}
      />
      <Input label="Bairro" name="district" value={form.district} disabled />
      <Input label="Cidade" name="city" value={form.city} disabled />
      <Input label="Estado" name="state" value={form.state} disabled />

      <button className="w-full bg-black text-white py-2 rounded">
        Salvar
      </button>
    </form>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full border rounded px-3 py-2 mt-1 disabled:bg-gray-100"
      />
    </div>
  );
}
