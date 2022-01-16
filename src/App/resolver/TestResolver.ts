import {Query, Resolver} from "@nestjs/graphql";

@Resolver()
export class TestResolver {
    @Query(() => String)
    async test() {
        return "bambus!";
    }
}
