import sqlalchemy

revision = None
down_revision = None
branch_labels = None
depends_on = None


def upgrade(op=None):
    bind = op.get_bind()
    url = str(bind.engine.url)

    try:
        if url.startswith("mysql"):
            op.drop_constraint(
                "instanced_challenge_ibfk_1", "instanced_challenge", type_="foreignkey"
            )
        elif url.startswith("postgres"):
            op.drop_constraint(
                "instanced_challenge_id_fkey", "instanced_challenge", type_="foreignkey"
            )
    except sqlalchemy.exc.InternalError as e:
        print(str(e))

    try:
        op.create_foreign_key(
            None, "instanced_challenge", "challenges", ["id"], ["id"], ondelete="CASCADE"
        )
    except sqlalchemy.exc.InternalError as e:
        print(str(e))


def downgrade(op=None):
    bind = op.get_bind()
    url = str(bind.engine.url)
    try:
        if url.startswith("mysql"):
            op.drop_constraint(
                "instanced_challenge_ibfk_1", "instanced_challenge", type_="foreignkey"
            )
        elif url.startswith("postgres"):
            op.drop_constraint(
                "instanced_challenge_id_fkey", "instanced_challenge", type_="foreignkey"
            )
    except sqlalchemy.exc.InternalError as e:
        print(str(e))

    try:
        op.create_foreign_key(None, "instanced_challenge", "challenges", ["id"], ["id"])
    except sqlalchemy.exc.InternalError as e:
        print(str(e))
