"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChartPieIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
});

type FormData = z.infer<typeof schema>;

export function SampleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = (data: FormData) => {
    // Simples validação de funcionamento
    console.log("Form submit:", data);
    reset();
  };

  // Simple chart data for basic validation of recharts
  const chartData = [
    { name: "Jan", value: 12 },
    { name: "Feb", value: 19 },
    { name: "Mar", value: 7 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ChartPieIcon className="size-5 text-sky-600" aria-hidden />
        <h2 className="text-lg font-semibold">Form + Icons + Charts</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            className="mt-1 w-full rounded border p-2"
            placeholder="Seu nome"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            className="mt-1 w-full rounded border p-2"
            placeholder="email@exemplo.com"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <button type="submit" className="rounded bg-sky-600 px-4 py-2 text-white">Enviar</button>
      </form>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}