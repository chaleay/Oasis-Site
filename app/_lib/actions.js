"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // regex to test ID length
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };
  console.log(updateData);

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  // good to reevalutate cache after every update, especially if need to see the updated information
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  // verify bookings from user contain the current booking
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((b) => b.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("This booking does not belong to the user");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  // auth
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const bookingId = Number(formData.get("bookingId"));

  // verify bookings from user contain the current booking
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((b) => b.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("This booking does not belong to the user");
  }

  // get form data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  // revalidate cache for both
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut("google", { redirectTo: "/" });
}
