import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { Table } from "@/components/ui/Table";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const databaseMigrationsTopic: Topic = {
  id: "database-migrations",
  title: "Database Migrations",
  description:
    "Version control for your database schema — how to safely evolve tables in production without data loss or downtime.",
  tags: ["databases", "devops", "deployment", "fullstack"],
  icon: "ArrowUpDown",
  content: [
    <p key="1">
      Your application schema evolves over time: new columns, renamed tables,
      changed data types. <strong>Database migrations</strong> are versioned,
      ordered scripts that transform the schema from one state to the next —
      like Git commits for your database.
    </p>,
    <CodeBlock
      key="2"
      language="typescript"
      title="Prisma Migration Workflow"
      code={`// 1. Update your schema file
// schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
  role  String @default("user")  // ← New column added
}

// 2. Generate migration
// $ npx prisma migrate dev --name add-user-role
// Creates: migrations/20250307_add_user_role/migration.sql

// 3. Generated SQL:
// ALTER TABLE "User" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'user';

// 4. Applied automatically to dev DB. In production:
// $ npx prisma migrate deploy`}
    />,
    <Table
      key="3"
      headers={["Tool", "Ecosystem", "Approach"]}
      rows={[
        [
          "Prisma Migrate",
          "Node.js / TypeScript",
          "Schema-first, auto-generated SQL",
        ],
        ["Flyway", "Java / JVM", "SQL-first, versioned files"],
        [
          "Alembic",
          "Python (SQLAlchemy)",
          "Python scripts, auto-detect changes",
        ],
        ["Knex.js", "Node.js", "JS migration files, up/down functions"],
        ["Rails ActiveRecord", "Ruby", "Ruby DSL, reversible migrations"],
        ["golang-migrate", "Go", "Raw SQL files, CLI-driven"],
      ]}
    />,
    <Grid key="4" cols={2} gap={6} className="my-8">
      <Card title="Safe Migration Rules">
        <p className="text-sm">
          <strong>1.</strong> Always add columns as <code>nullable</code> or
          with <code>DEFAULT</code> — never NOT NULL without default on existing
          tables. <strong>2.</strong> Never rename columns directly — add new,
          migrate data, drop old (3-step). <strong>3.</strong> Never drop
          columns that running code still references.
        </p>
      </Card>
      <Card title="Zero-Downtime Migrations">
        <p className="text-sm">
          Deploy in phases: <strong>v1</strong> (code reads old + new column),{" "}
          <strong>v2</strong> (migrate data), <strong>v3</strong> (code reads
          only new column), <strong>v4</strong> (drop old column). This ensures
          both old and new code versions work during rolling deployments.
        </p>
      </Card>
    </Grid>,
    <Callout key="5" type="warning" title="The Irreversible Migration">
      <code>DROP TABLE</code> and <code>DROP COLUMN</code> are{" "}
      <strong>irreversible in production</strong> — the data is gone forever.
      Always write <strong>down migrations</strong> (rollback scripts) and test
      them before deploying. Better yet: mark columns as deprecated for 2
      releases before dropping.
    </Callout>,
  ],
};
