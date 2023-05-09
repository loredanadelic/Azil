import { createClient } from "@supabase/supabase-js";

export const filterValues = {
  Filter: {
    ["Svi"]: "",
    ["Udomljen"]: "true",
    ["Nije udomljen"]: "false",
  },
  Vrsta: {
    ["Sve"]: "",
    ["Mačka"]: "macka",
    ["Pas"]: "pas",
    ["Zec"]: "zec",
  },
};

export const supabase = createClient(
  "https://aqxjbjluiytcpphzgyss.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxeGpiamx1aXl0Y3BwaHpneXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIxODQ3NzcsImV4cCI6MTk5Nzc2MDc3N30.SC8ilVAWJ0A9pf-6MyDHTwl5SNpAAXqdKdwWPb6fpsk"
);

export const getAnimalImage = (animal) => {
  return animal === "pas"
    ? "dog.png"
    : animal === "macka"
    ? "cat.png"
    : animal === "zec"
    ? "rabbit.png"
    : "livestock.png";
};
const donate = async (id) => {
  const { error } = await supabase
    .from("donations")
    .update({
      category: "donirano",
    })
    .eq("id", id);
  if (error) {
    return error;
  } else {
    return null;
  }
};
const need = async (id, donation) => {
  const newDonation = {
    type: donation.type,
    value: donation.value,
    description: donation.description,
    category: "trazi",
  };
  const { error } = await supabase.from("donations").insert([newDonation]);
  if (error) {
    return error;
  } else {
    return null;
  }
};
const deleteId = async (id) => {
  const { error } = await supabase.from("donations").delete().eq("id", id);
  if (error) {
    return error;
  } else {
    return null;
  }
};
export const actionTypes = {
  donate: (id) => donate(id),
  need: (id, donation) => need(id, donation),
  delete: (id) => deleteId(id),
};

export const animalData = {
  name: "",
  type: "",
  description: "",
  examination: "",
  chip: false,
  adopted: false,
  years: null,
  image: null,
};

export const filtering = (animals, filter, type, search) => {
  if (filter !== "" && type !== "") {
    return animals.filter(
      (animal) =>
        animal.adopted.toString() === filter &&
        animal.type === type &&
        animal.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  } else if (filter === "" && type !== "") {
    return animals.filter(
      (animal) =>
        animal.type === type &&
        animal.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  } else if (filter !== "" && type === "") {
    return animals.filter(
      (animal) =>
        animal.adopted.toString() === filter &&
        animal.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  } else if (search !== "") {
    return animals.filter(
      (animal) => animal.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  } else {
    return animals;
  }
};
