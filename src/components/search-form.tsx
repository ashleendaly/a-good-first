"use client";

import { useForm } from "react-hook-form";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

const allowedLanguages = [
  "all",
  "python",
  "javascript",
  "solidity",
  "swift",
  "typescript",
  "c",
  "c++",
  "c#",
  "go",
  "java",
  "php",
  "ruby",
  "scala",
] as const;

const searchParamsSchema = z.object({
  searchQuery: z.string().catch(""),
  language: z.enum(allowedLanguages).catch(allowedLanguages[0]),
});

const SearchForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { register, handleSubmit } =
    useForm<z.infer<typeof searchParamsSchema>>();

  const onSubmit = handleSubmit((data) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("q", data.searchQuery);
    current.set("language", data.language);
    const search = current.toString();
    router.push(`${pathname}?${search}`);
  });

  return (
    <form onSubmit={onSubmit} className="mt-5 flex gap-2">
      <input
        className="w-8/12 rounded-md bg-gray-50 px-2 transition-all duration-200"
        placeholder="search a topic or organisation..."
        defaultValue={searchParams.get("q") ?? ""}
        {...(register("searchQuery"), { required: true })}
      />
      <select
        className="w-3/12 rounded-md bg-gray-50 p-1 px-2"
        defaultValue={searchParams.get("language") ?? "all"}
        {...register("language")}
      >
        {allowedLanguages.map((language) => {
          return (
            <option key={language} value={language}>
              {language}
            </option>
          );
        })}
      </select>

      <button className="grid w-1/12 place-items-center rounded-md border bg-blue-500 p-2 text-white transition-colors duration-200 hover:bg-blue-700">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchForm;
