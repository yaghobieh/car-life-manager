import { describe, expect, it } from "vitest";
import { groupTasks, nextTasks } from "./task-groups";
import type { Task } from "./types";

function task(id: string, extra: Partial<Task>): Task {
  return {
    id,
    vehicleId: "v1",
    title: id,
    description: id,
    category: "services",
    priority: "normal",
    status: "not_started",
    dueDate: null,
    provider: null,
    source: "task-engine",
    externalUrl: null,
    createdAt: "2026-09-01T00:00:00.000Z",
    completedAt: null,
    ...extra,
  };
}

describe("groupTasks", () => {
  it("splits urgent, this week, later and completed", () => {
    const now = new Date("2026-09-06T10:00:00.000Z");
    const groups = groupTasks([
      task("overdue", { priority: "overdue" }),
      task("week", { dueDate: "2026-09-09" }),
      task("later", { dueDate: "2026-10-01" }),
      task("done", { status: "completed", completedAt: "2026-09-05T00:00:00.000Z" }),
    ], now);

    expect(groups.urgent.map((item) => item.id)).toEqual(["overdue"]);
    expect(groups.this_week.map((item) => item.id)).toEqual(["week"]);
    expect(groups.later.map((item) => item.id)).toEqual(["later"]);
    expect(groups.completed.map((item) => item.id)).toEqual(["done"]);
    expect(nextTasks([
      task("overdue", { priority: "overdue" }),
      task("week", { dueDate: "2026-09-09" }),
      task("later", { dueDate: "2026-10-01" }),
      task("done", { status: "completed", completedAt: "2026-09-05T00:00:00.000Z" }),
    ], 2, now).map((item) => item.id)).toEqual(["overdue", "week"]);
  });
});
