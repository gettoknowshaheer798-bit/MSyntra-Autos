"use client";

import type { Vehicle } from "@/types/vehicle";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function TestDriveDrawer({
    isOpen,
    onClose,
    vehicle,
}: {
    isOpen: boolean;
    onClose: () => void;
    vehicle: Vehicle;
}) {
    const [driveType, setDriveType] = useState<"showroom" | "concierge">("showroom");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const resetAndClose = () => {
        onClose();
        setTimeout(() => setIsSubmitted(false), 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={resetAndClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Slide-over Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 280 }}
                        className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-foreground p-8 text-white shadow-2xl overflow-y-auto"
                    >
                        <button
                            onClick={resetAndClose}
                            className="absolute right-6 top-6 text-sm font-semibold tracking-widest text-muted-foreground transition hover:text-white"
                        >
                            CLOSE ✕
                        </button>

                        {!isSubmitted ? (
                            <div className="mt-8 flex flex-col h-full justify-between">
                                <div>
                                    <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                                        VIP Concierge Service
                                    </p>
                                    <h3 className="mt-1 font-serif text-2xl font-normal">
                                        Schedule Test Drive
                                    </h3>
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        Experience the {vehicle.year} {vehicle.make} {vehicle.model} on your own terms.
                                    </p>

                                    {/* Drive Type Selector */}
                                    <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg bg-white/5 p-1">
                                        <button
                                            type="button"
                                            onClick={() => setDriveType("showroom")}
                                            className={`rounded-md py-2 text-[11px] font-semibold tracking-wider transition ${driveType === "showroom"
                                                ? "bg-accent text-white"
                                                : "text-muted-foreground hover:text-white"
                                                }`}
                                        >
                                            SHOWROOM
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDriveType("concierge")}
                                            className={`rounded-md py-2 text-[11px] font-semibold tracking-wider transition ${driveType === "concierge"
                                                ? "bg-accent text-white"
                                                : "text-muted-foreground hover:text-white"
                                                }`}
                                        >
                                            HOME DELIVERY
                                        </button>
                                    </div>

                                    {/* Booking Form */}
                                    <form id="test-drive-form" onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                                        <div>
                                            <label className="block text-[10px] font-semibold tracking-widest text-muted-foreground uppercase mb-1">
                                                Full Name
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#E60012]"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[10px] font-semibold tracking-widest text-muted-foreground uppercase mb-1">
                                                    Preferred Date
                                                </label>
                                                <input
                                                    required
                                                    type="date"
                                                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white outline-none focus:border-[#E60012] [color-scheme:dark]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-semibold tracking-widest text-muted-foreground uppercase mb-1">
                                                    Time Slot
                                                </label>
                                                <select
                                                    required
                                                    className="w-full rounded-md border border-white/10 bg-[#161618] px-3 py-2.5 text-xs text-white outline-none focus:border-[#E60012]"
                                                >
                                                    <option value="morning">Morning (10 AM)</option>
                                                    <option value="afternoon">Afternoon (2 PM)</option>
                                                    <option value="evening">Evening (5 PM)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-semibold tracking-widest text-muted-foreground uppercase mb-1">
                                                {driveType === "showroom" ? "Preferred Dealership" : "Delivery Address"}
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                placeholder={
                                                    driveType === "showroom"
                                                        ? "e.g. MSyntra Motors Central Showroom"
                                                        : "Enter street address & postal code"
                                                }
                                                className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#E60012]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-semibold tracking-widest text-muted-foreground uppercase mb-1">
                                                Phone Number
                                            </label>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#E60012]"
                                            />
                                        </div>
                                    </form>
                                </div>

                                <div className="mt-8 pt-4 border-t border-white/10">
                                    <button
                                        type="submit"
                                        form="test-drive-form"
                                        className="w-full rounded-full bg-accent py-3 text-xs font-semibold tracking-widest text-white transition hover:opacity-90"
                                    >
                                        CONFIRM {driveType === "concierge" ? "HOME" : "SHOWROOM"} RESERVATION
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Success State */
                            <div className="mt-20 flex flex-col items-center text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent text-2xl font-bold mb-4">
                                    ✓
                                </div>
                                <h3 className="font-serif text-2xl font-normal">Reservation Confirmed</h3>
                                <p className="mt-2 text-xs leading-relaxed text-muted-foreground max-w-xs">
                                    Your VIP test drive for the <strong className="text-white">{vehicle.model}</strong> has been received. An MSyntra concierge specialist will reach out shortly.
                                </p>
                                <button
                                    onClick={resetAndClose}
                                    className="mt-8 rounded-full border border-white/20 px-6 py-2.5 text-xs font-semibold tracking-widest text-white transition hover:bg-white hover:text-black"
                                >
                                    DONE
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}