"use client";

import { Plus, Trash2 } from "lucide-react";
import Input from "@/components/ui/Input";
import { TeamMember } from "@/types/registration";

interface TeamMemberInputProps {
  members: TeamMember[];
  onChange: (members: TeamMember[]) => void;
  errors?: string;
}

export default function TeamMemberInput({
  members,
  onChange,
  errors,
}: TeamMemberInputProps) {
  const addMember = () => {
    if (members.length >= 5) return;
    onChange([...members, { name: "", role: "" }]);
  };

  const removeMember = (index: number) => {
    if (members.length <= 1) return;
    onChange(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = members.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    );
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-navy-700">
          Team Members ({members.length}/5)
        </label>
        {members.length < 5 && (
          <button
            type="button"
            onClick={addMember}
            className="inline-flex items-center text-sm text-river-500 hover:text-river-600 font-medium cursor-pointer"
          >
            <Plus size={16} className="mr-1" /> Add Member
          </button>
        )}
      </div>

      <div className="space-y-3">
        {members.map((member, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="flex-1">
              <Input
                placeholder="Member name"
                value={member.name}
                onChange={(e) => updateMember(i, "name", e.target.value)}
              />
            </div>
            <div className="w-40">
              <Input
                placeholder="Role"
                value={member.role}
                onChange={(e) => updateMember(i, "role", e.target.value)}
              />
            </div>
            {members.length > 1 && (
              <button
                type="button"
                onClick={() => removeMember(i)}
                className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      {errors && <p className="mt-1 text-sm text-red-500">{errors}</p>}
    </div>
  );
}
