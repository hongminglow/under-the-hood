import type { Topic } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const dependencyInjectionTopic: Topic = {
  id: "dependency-injection",
  title: "Dependency Injection & IoC",
  description:
    "The design principle that makes code testable and flexible by inverting who creates dependencies — powering NestJS, Spring, and Angular.",
  tags: ["architecture", "design-patterns", "testing", "backend"],
  icon: "Syringe",
  content: [
    <p key="1">
      In tightly coupled code, a class{" "}
      <strong>creates its own dependencies</strong>:{" "}
      <code>this.db = new PostgresDB()</code>. You can't test it without a real
      database. You can't swap to MongoDB.
      <strong> Dependency Injection</strong> (DI) flips this: dependencies are{" "}
      <strong>provided from the outside</strong>.
    </p>,
    <CodeBlock
      key="2"
      language="typescript"
      title="DI in Practice"
      code={`// ❌ Tight Coupling — UserService creates its own dependency
class UserService {
  private db = new PostgresDB();  // Hardcoded. Untestable.
  async getUser(id: string) {
    return this.db.query('SELECT * FROM users WHERE id = $1', [id]);
  }
}

// ✅ Dependency Injection — dependency provided externally
class UserService {
  constructor(private db: Database) {}  // Injected via constructor
  async getUser(id: string) {
    return this.db.query('SELECT * FROM users WHERE id = $1', [id]);
  }
}

// Production: new UserService(new PostgresDB())
// Testing:    new UserService(new MockDB())
// Migration:  new UserService(new MongoDB())`}
    />,
    <Grid key="3" cols={3} gap={6} className="my-8">
      <Card title="Constructor Injection">
        <p className="text-sm">
          Dependencies passed via <strong>constructor parameters</strong>. Most
          common, most explicit. Used by NestJS, Angular, Spring Boot.
        </p>
      </Card>
      <Card title="Property Injection">
        <p className="text-sm">
          Dependencies set via <strong>decorators or setters</strong> after
          construction. Less explicit but useful for optional dependencies.
          Common in Angular (<code>@Inject()</code>).
        </p>
      </Card>
      <Card title="IoC Container">
        <p className="text-sm">
          A central registry that <strong>automatically resolves</strong> and
          injects dependencies. You register interfaces and implementations; the
          container wires everything. NestJS, Spring, and Angular all have
          built-in IoC containers.
        </p>
      </Card>
    </Grid>,
    <CodeBlock
      key="4"
      language="typescript"
      title="NestJS IoC Container"
      code={`// NestJS resolves dependencies automatically via decorators
@Injectable()
class UserService {
  constructor(
    private readonly db: DatabaseService,      // Auto-injected
    private readonly cache: CacheService,      // Auto-injected
    private readonly logger: LoggerService,     // Auto-injected
  ) {}
}

@Module({
  providers: [UserService, DatabaseService, CacheService, LoggerService],
})
class AppModule {}`}
    />,
    <Callout key="5" type="tip" title="DI Enables Testing">
      The #1 practical benefit: <strong>mocking dependencies in tests</strong>.
      Without DI, testing a service that calls a database, cache, and email
      provider requires all three to be running. With DI, inject mocks and test
      pure business logic in milliseconds.
    </Callout>,
  ],
};
