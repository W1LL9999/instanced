import sqlalchemy as sa
from CTFd.plugins.migrations import get_columns_for_table

revision = "eb68f277ab61"
down_revision = "b37fb68807ea"
branch_labels = None
depends_on = None


def upgrade(op=None):
    columns = get_columns_for_table(
        op=op, table_name="instanced_challenge", names_only=True
    )
    if "function" not in columns:
        op.add_column(
            "instanced_challenge",
            sa.Column("function", sa.String(length=32), nullable=True),
        )
        conn = op.get_bind()
        url = str(conn.engine.url)
        if url.startswith("postgres"):
            conn.execute(
                "UPDATE instanced_challenge SET function = 'logarithmic' WHERE function IS NULL"
            )
        else:
            conn.execute(
                "UPDATE instanced_challenge SET `function` = 'logarithmic' WHERE `function` IS NULL"
            )


def downgrade(op=None):
    columns = get_columns_for_table(
        op=op, table_name="instanced_challenge", names_only=True
    )
    if "function" in columns:
        op.drop_column("instanced_challenge", "function")
